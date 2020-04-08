// function for getting data from json

document.querySelector('#page1').style.display = 'block';
document.querySelector('#page2').style.display = 'none';
document.querySelector('#page3').style.display = 'none';

async function getdata() {
  const videosresponse = await fetch('videos.JSON');
  const videosdata = await videosresponse.json();

  return {
    videos: videosdata,
  };
}

function comparebydate(a, b) {
  const dataA = a.date;
  const dataB = b.date;

  let comparison = 0;
  if (dataA > dataB) {
    comparison = 1;
  } else if (dataA < dataB) {
    comparison = -1;
  }
  return comparison * -1;
}

function comparebyduration(a, b) {
  const dataA = a.duration;
  const dataB = b.duration;

  let comparison = 0;
  if (dataA > dataB) {
    comparison = 1;
  } else if (dataA < dataB) {
    comparison = -1;
  }
  return comparison * -1;
}

function comparebyname(a, b) {
  const dataA = a.name;
  const dataB = b.name;

  let comparison = 0;
  if (dataA > dataB) {
    comparison = 1;
  } else if (dataA < dataB) {
    comparison = -1;
  }
  return comparison;
}
// implementation
// function getvideo(id) {
//   getdata().then((data) => {
//     // console.log(data.videos[id - 1]);
//     let element = data.videos[id - 1].url;
//     return element;
//   });
//   console.log(element);
// }

// getvideo();
function init() {
  getdata().then((data) => {
    // console.log(data.videos[id - 1]);
    data.videos.forEach((element) => {
      let tempurl = element.url;
      // console.log(document.getElementById(`${element.id}`).firstElementChild);

      document
        .getElementById(`${element.id}`)
        .firstElementChild.setAttribute('data-video', tempurl);

      document.getElementById(
        `${element.id}`
      ).firstElementChild.innerHTML = `<iframe width="100%" height="100%" src=${element.url} frameborder="0" allow="autoplay" allowfullscreen></iframe>`;

      //   inserting date & duration

      let temphtml = document.createElement('div');

      temphtml.innerHTML = `<div class="d-flex justify-content-between p-0 m-0">
      <div class="text-left text-secondary px-3">${element.duration} mins</div>
      <div class="text-right text-secondary px-3">${element.datetext}</div>
    </div>`;

      document
        .getElementById(`${element.id}`)
        .parentElement.insertBefore(
          temphtml,
          document.getElementById(`${element.id}`).parentElement
            .lastElementChild
        );
    });
  });

  getdata().then((data) => {
    // console.log(data.videos[id - 1]);
    data.videos.forEach((element) => {
      let tempurl = element.url;
      // console.log(document.getElementById(`${element.id}`).firstElementChild);

      document
        .getElementById(`${element.id}`)
        .parentElement.lastElementChild.setAttribute('data-video', tempurl);
    });
  });
}
init();

// function searchfunction() {
//   //   let text = document.querySelector('#searchbar');
//   console.log(document.querySelector('#searchbar'));
// }

// event-listeners

// document.querySelector('.video').addEventListener('click', function (e) {
//   const tempid = e.target.parentElement.parentElement.id;

//   getdata().then((data) => {
//     // console.log(data.videos[id - 1]);
//     let tempurl = data.videos[tempid - 1].url;

//     e.target.parentElement.setAttribute('data-video', tempurl);
//     console.log(e.target.parentElement);
//   });
// });

document.querySelector('#searchbtn').addEventListener('click', function () {
  //   console.log(document.querySelector('#searchbar').value);

  let text = document.querySelector('#searchbar').value;
  document.querySelector('#mainarea').innerHTML = '';

  getdata().then((data) => {
    let vidarr = [];

    if (document.querySelector('#filter').value === 'none') {
      vidarr = data.videos;
    }

    // year filter
    else if (document.querySelector('#filter').value === 'year') {
      data.videos.forEach((element) => {
        if (element.date > 20200000) {
          vidarr.push(element);
        }
      });
    }

    // month filter
    else if (document.querySelector('#filter').value === 'month') {
      data.videos.forEach((element) => {
        if (element.date > 20200400) {
          vidarr.push(element);
        }
      });
    }

    // this week filter
    else if (document.querySelector('#filter').value === 'week') {
      data.videos.forEach((element) => {
        if (element.date > 20200401) {
          vidarr.push(element);
        }
      });
    }

    // today filter
    else {
      data.videos.forEach((element) => {
        if (element.date >= 20200408) {
          vidarr.push(element);
        }
      });
    }
    // sorting

    // sort by date(latest)

    if (document.querySelector('#sort').value === 'latest') {
      console.log(vidarr.sort(comparebydate));
    }

    // sort by duration
    else if (document.querySelector('#sort').value === 'duration') {
      console.log(vidarr.sort(comparebyduration));
    }

    // sort by name
    else if (document.querySelector('#sort').value === 'name') {
      console.log(vidarr.sort(comparebyname));
    }

    // pushing to ui

    vidarr.forEach((element) => {
      if (element.name.indexOf(text) == 0) {
        // console.log(element);

        document.querySelector('#mainarea').innerHTML += `
        <div class=" mb-5 pt-5">
        <div class="videobox text-center p-0 m-auto " id="${element.id}">
          <a
            href="#"
            data-toggle="modal"
            data-target="#video-modal"
            class="video"
            data-video=${element.url}
            ><iframe width="100%" height="100%" src=${element.url} frameborder="0" allow="autoplay" allowfullscreen></iframe></a>
        </div>


        <div class="d-flex justify-content-between p-0 m-0 bg-dark text-danger">
      <div class="text-left px-3 font-weight-bold pt-3">${element.duration} mins</div>
      <a
            href="#"
            data-toggle="modal"
            data-target="#video-modal"
            class="video text-center mt-0"
            data-video="${element.url}"
            ><h3 class="video-heading py-2 mt-0 text-danger text-capitalize">${element.name}</h3></a>
      <div class="text-right px-3 font-weight-bold pt-3">${element.datetext}</div>
    </div>

        
      </div>
      `;
      }
    });
    initagain();
  });
});

// page changers

document.querySelector('#one').addEventListener('click', function (e) {
  document.querySelector('#page1').style.display = 'block';
  document.querySelector('#page2').style.display = 'none';
  document.querySelector('#page3').style.display = 'none';

  e.preventDefault();
});

document.querySelector('#two').addEventListener('click', function (e) {
  document.querySelector('#page1').style.display = 'none';
  document.querySelector('#page2').style.display = 'block';
  document.querySelector('#page3').style.display = 'none';

  e.preventDefault();
});

document.querySelector('#three').addEventListener('click', function (e) {
  document.querySelector('#page1').style.display = 'none';
  document.querySelector('#page2').style.display = 'none';
  document.querySelector('#page3').style.display = 'block';

  e.preventDefault();
});

// video
function initagain() {
  $(function () {
    $('.video').click(function (e) {
      var theModal = $(this).data('target'),
        videoSRC = $(this).attr('data-video'),
        videoSRCauto =
          videoSRC +
          '?modestbranding=1&rel=0&controls=0&showinfo=0&html5=1&autoplay=1';
      $(theModal + ' iframe').attr('src', videoSRCauto);
      $(theModal + ' button.close').click(function () {
        $(theModal + ' iframe').attr('src', videoSRC);
      });
    });
  });
}

initagain();

// if (document.querySelector('#filter').value === 'year') {
//     let temparr;
//   data.videos.forEach((element) => {
//       if(element.date > 20200000){
//           temparr.push(element);
//       }
// }
// }
