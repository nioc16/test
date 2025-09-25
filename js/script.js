//----------------------------------------------------MINI JEU--------------------------------------------------------//

(function () {
  const artistsData = [
    { id: "1", name: "Ed Sheeran" },
    { id: "2", name: "The Weeknd" },
    { id: "3", name: "Gims" },
    { id: "4", name: "Sia" },
    { id: "5", name: "Scorpion" },
    { id: "6", name: "Dua Lipa" },
    { id: "7", name: "Adele" },
    { id: "8", name: "Maroon 5" },
    { id: "9", name: "AC/DC" },
    { id: "10", name: "Stromae" }
  ];

  const songsData = [
    { id: "1", title: "Shape of You" },
    { id: "2", title: "Blinding Lights" },
    { id: "3", title: "Bella" },
    { id: "4", title: "Cheap Thrills" },
    { id: "5", title: "Still lovin you" },
    { id: "6", title: "Levitating" },
    { id: "7", title: "Hello" },
    { id: "8", title: "Sugar" },
    { id: "9", title: "Highway to hell" },
    { id: "10", title: "Formidable" }
  ];

  // Fisher-Yates shuffle function
  function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
  }

  const shuffledArtists = shuffle(artistsData.slice());
  const shuffledSongs = shuffle(songsData.slice());

  // Split arrays in half for columns
  const artistsPart1 = shuffledArtists.slice(0, 5);
  const artistsPart2 = shuffledArtists.slice(5);
  const songsPart1 = shuffledSongs.slice(0, 5);
  const songsPart2 = shuffledSongs.slice(5);

  function renderList(id, items, isArtist = true) {
    const container = document.getElementById(id);
    container.innerHTML = "";
    items.forEach(item => {
      const li = document.createElement("li");
      li.dataset.id = item.id;
      li.textContent = isArtist ? item.name : item.title;
      container.appendChild(li);
    });
  }

  renderList("artists-list-part1", artistsPart1);
  renderList("artists-list-part2", artistsPart2);
  renderList("songs-list1", songsPart1, false);
  renderList("songs-list2", songsPart2, false);

  const totalMatches = 10;
  let selectedArtist = null;
  let selectedSong = null;
  let matches = 0;

  function clearSelection() {
    artists.forEach(a => a.classList.remove("selected", "wrong"));
    songs.forEach(s => s.classList.remove("selected", "wrong"));
    selectedArtist = null;
    selectedSong = null;
    message.textContent = "";
  }

  const artists = [...document.querySelectorAll("#artists-list-part1 li"), ...document.querySelectorAll("#artists-list-part2 li")];
  const songs = [...document.querySelectorAll("#songs-list1 li"), ...document.querySelectorAll("#songs-list2 li")];
  const message = document.getElementById("message");

  artists.forEach(artist => {
    artist.addEventListener("click", () => {
      if (artist.classList.contains("correct")) return;
      if (selectedArtist) selectedArtist.classList.remove("selected");
      selectedArtist = artist;
      artist.classList.add("selected");
      message.textContent = "Artiste sélectionné : " + artist.textContent + ". Sélectionnez maintenant la chanson correspondante.";
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
        message.textContent = "Bonne association ! 🎉 " + selectedArtist.textContent + " - " + selectedSong.textContent;
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

//--------------------------------------------------------------------------------------------------------------------//  