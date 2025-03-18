

fetch('https://www.blagues-api.fr/api/random', {
    headers: {
      'Authorization': ` Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjg3MzQ5NzY5NTk2Njk4NjQzIiwibGltaXQiOjEwMCwia2V5IjoiWHZIZTVRbEJuRHYzcDBoeVlKQU9ldUU4TmZ0Y2lBSmJONElRR1lXbmtWNEhtb1A5dzQiLCJjcmVhdGVkX2F0IjoiMjAyNS0wMy0xOFQxMjo1MToyNyswMDowMCIsImlhdCI6MTc0MjMwMjI4N30.HG3q3Xc5eofHGrz4Jv3DPh6rxA3-3RyakicCFQt4o30 `
    }
  })
  .then(response => response.json())
  .then(data => {


    const type = data.type;
    const joke = data.joke;
    const answer = data.answer;

    
    document.getElementById('type').textContent = type;
    document.getElementById('joke').textContent = joke;
    document.getElementById('answer').textContent = answer;

    
    console.log(data);
    console.log('ID:', id);
    console.log('Type:', type);
    console.log('Joke:', joke);
    console.log('Answer:', answer);
  })

  

  

  Questions = [
    "Comment appelle-t-on un choux qui vit sous l'eau ?",
    "Comment appelle-t-on un hamster qui vit dans la lune ?",

  ]
  Reponses = [
    "Un choux marin",
    "un hamsteroid",

  ]
