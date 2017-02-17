const endpoint = 'http://localhost:8080/blog-posts/'

$(function(){
  console.log("Hello!");
  $.getJSON(endpoint, data => {
    //console.log(data);
    const $container = $('#container');
    data.forEach(x => {
    $container.append(`<div class="post">
        <h2 class="title">${x.title}</h2>
          <h4>Author: ${x.author}</h4>
            <p>${x.content}</p> </div>`)
    });
  });
});
