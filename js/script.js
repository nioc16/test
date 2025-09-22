
(function() {
  let selectedArtist = null;
  let selectedSong = null;
  let matches = 0;
  const totalMatches = 3;

  const artists = document.querySelectorAll("#artists-list li");
  const songs = document.querySelectorAll("#songs-list li");
  const message = document.getElementById("message");

  function clearSelection() {
    artists.forEach(a => a.classList.remove("selected", "wrong"));
    songs.forEach(s => s.classList.remove("selected", "wrong"));
    selectedArtist = null;
    selectedSong = null;
    message.textContent = "";
  }

  artists.forEach(artist => {
    artist.addEventListener("click", () => {
      if (artist.classList.contains("correct")) return;
      if (selectedArtist) selectedArtist.classList.remove("selected");
      selectedArtist = artist;
      artist.classList.add("selected");
      message.textContent = "Sélectionnez maintenant la chanson correspondante";
    });
  });

  songs.forEach(song => {
    song.addEventListener("click", () => {
      if (song.classList.contains("correct")) return;
      if (!selectedArtist) {
        message.textContent = "Veuillez d'abord sélectionner un artiste.";
        return;
      }
      selectedSong = song;
      song.classList.add("selected");

      if (selectedArtist.dataset.id === selectedSong.dataset.id) {
        selectedArtist.classList.add("correct");
        selectedSong.classList.add("correct");
        message.textContent = "Bonne association ! 🎉";
        matches++;
        if (matches === totalMatches) {
          message.textContent = "Félicitations ! Vous avez tout associé.";
        }
      } else {
        selectedArtist.classList.add("wrong");
        selectedSong.classList.add("wrong");
        message.textContent = "Mauvaise association, réessayez.";
      }
      setTimeout(() => {
        clearSelection();
      }, 1000);
    });
  });
})();
