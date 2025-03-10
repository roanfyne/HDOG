const PASSWORD = "hotcats+dogs";

function verifyPassword() {
    const passwordInput = document.getElementById('password-input').value;
    if (passwordInput === PASSWORD) {
        document.getElementById('password-verification').classList.add('hidden');
        document.getElementById('content').classList.remove('hidden');
    } else {
        alert('Incorrect password!');
    }
}

function uploadAlbum() {
    const title = document.getElementById('album-title').value;
    const cover = document.getElementById('album-cover').files[0];

    if (title && cover) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const albumDiv = document.createElement('div');
            albumDiv.classList.add('album');

            const img = document.createElement('img');
            img.src = e.target.result;

            const albumTitle = document.createElement('div');
            albumTitle.classList.add('album-title');
            albumTitle.textContent = title;

            const songDropdown = document.createElement('select');
            songDropdown.classList.add('song-dropdown');

            const addSongButton = document.createElement('button');
            addSongButton.textContent = 'Upload MP3';
            addSongButton.onclick = function() {
                uploadSong(songDropdown);
            };

            albumDiv.appendChild(img);
            albumDiv.appendChild(albumTitle);
            albumDiv.appendChild(songDropdown);
            albumDiv.appendChild(addSongButton);

            document.getElementById('albums').appendChild(albumDiv);
        };
        reader.readAsDataURL(cover);
    } else {
        alert('Please provide both a title and a cover image.');
    }
}

function uploadSong(dropdown) {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'audio/mp3';
    fileInput.onchange = function() {
        const file = fileInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const option = document.createElement('option');
                option.textContent = file.name;
                option.value = e.target.result;
                dropdown.appendChild(option);
            };
            reader.readAsDataURL(file);
        }
    };
    fileInput.click();
}

document.addEventListener('change', function(e) {
    if (e.target.classList.contains('song-dropdown')) {
        playSong(e.target);
    }
});

function playSong(dropdown) {
    const audioPlayer = document.getElementById('audio-player');
    const nowPlaying = document.getElementById('now-playing');

    audioPlayer.src = dropdown.value;
    nowPlaying.textContent = `Now Playing: ${dropdown.selectedOptions[0].textContent}`;
    audioPlayer.play();

    audioPlayer.onended = function() {
        const nextOption = dropdown.options[dropdown.selectedIndex + 1];
        if (nextOption) {
            dropdown.value = nextOption.value;
            playSong(dropdown);
        } else {
            nowPlaying.textContent = 'Now Playing: None';
        }
    };
}