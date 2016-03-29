function initialize() {
  var feed = new google.feeds.Feed("http://feeds.feedburner.com/tedtalks_video");
  feed.load(function(result) {
    if (!result.error) {
      setFeedData(result);
    }
  });
}

function setFeedData(result){
  var containerTable = document.getElementById("feedTableBody");

  for (var i = 0; i < result.feed.entries.length; i++) {
    var entry = result.feed.entries[i];
    var trTag = document.createElement("tr");
    var tdTagTitle = document.createElement("td");
    var tdTagAuthor = document.createElement("td");
    var tdTagCatgegory = document.createElement("td");
    var tdTagButton= document.createElement("td");
    var expandIcon= document.createElement("i");
    var expandBtn = document.createElement("button");
    var centerTag = document.createElement("center");

    $(expandIcon).addClass("fa fa-binoculars fa-lg");
    $(expandBtn).attr("id","modalBtn" + i);
    $(expandBtn).addClass("transparentStyle");

    expandBtn.appendChild(expandIcon);
    tdTagTitle.appendChild(document.createTextNode(entry.title.substr(0, entry.title.indexOf('|'))));
    tdTagAuthor.appendChild(document.createTextNode(entry.title.substr( entry.title.indexOf('|')).substring(2)));
    tdTagCatgegory.appendChild(document.createTextNode(entry.publishedDate.substr(0, entry.publishedDate.length-15)));
    centerTag.appendChild(expandBtn)
    tdTagButton.appendChild(centerTag);


    trTag.appendChild(tdTagTitle);
    trTag.appendChild(tdTagAuthor);
    trTag.appendChild(tdTagCatgegory);
    trTag.appendChild(tdTagButton);
    containerTable.appendChild(trTag);

    setModal(i, entry);
    expandBtn.onclick = function(){
      showModal(this);
    };
    $(expandBtn).trigger("click");
  }
}


function setModal(btnNum, entry){
  var build = document.getElementById('buildModal');
  var divModal = document.createElement("div");
  var divModalContent = document.createElement("div");
  var divModalHeader = document.createElement("div");
  var divModalBody = document.createElement("div");
  var spanModal = document.createElement("span");
  var newlineTag = document.createElement("br");
  var centerTag = document.createElement("center");

  $(divModal).attr("id","modalFeed"+btnNum);
  $(divModal).addClass("modal");
  $(divModalContent).addClass("modal-content");
  $(divModalHeader).addClass("modal-header");
  $(divModalBody).addClass("modal-body");
  $(spanModal).addClass("close");
  $(spanModal).attr("id","spanModal"+btnNum);

  $(spanModal).text("x");

  //image
  var imgTag = document.createElement("img");
  var divImg = document.createElement("div");
  $(imgTag).attr("src", entry.mediaGroups[0].contents[0].thumbnails[0].url);
  $(divImg).addClass("resizeimg");
  divImg.appendChild(imgTag);
  centerTag.appendChild(divImg);

  centerTag.appendChild(newlineTag);
  divModalBody.appendChild(centerTag);
  var paragraph = document.createElement("p");
  var paragraph2 = document.createElement("p");
  var paragraph3 = document.createElement("p");
  $(paragraph).addClass("title");
  paragraph.appendChild(document.createTextNode(entry.title))
  divModalBody.appendChild(paragraph);
  paragraph2.appendChild(document.createTextNode(entry.content.substr(0, entry.content.indexOf('<img src'))));
  divModalBody.appendChild(paragraph2);

  var centerFooterTag = document.createElement("center");
  $(paragraph3).append(document.createTextNode("See full post "))
  $(paragraph3).append("<a href=" + entry.link + ">here.</a>");
  centerFooterTag.appendChild(paragraph3)
  divModalBody.appendChild(centerFooterTag);



  divModalHeader.appendChild(spanModal);
  divModalContent.appendChild(divModalHeader);
  divModalContent.appendChild(divModalBody);
  divModal.appendChild(divModalContent);

  build.appendChild(divModal);



}

function showModal(me){
  //alert("im " + $(me).attr("id"));

  var btnNum = $(me).attr("id").slice(-1);
  var modal = document.getElementById("modalFeed" + btnNum);
  var btn = document.getElementById("modalBtn" + btnNum);
  var span = document.getElementById("spanModal" + btnNum);

  btn.onclick = function() {
      modal.style.display = "block";
  }

  span.onclick = function() {
    modal.style.display = "none";
  }

  window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
  }
}
