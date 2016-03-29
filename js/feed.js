//triggers google feeds
function initialize() {
  var feed = new google.feeds.Feed("http://feeds.feedburner.com/tedtalks_video");
  feed.load(function(result) {
    if (!result.error) {
      setFeedData(result);
    }
  });
}

//creates the table to display the feed data
function setFeedData(result){
  var containerTable = document.getElementById("feedTableBody");

  for (var i = 0; i < result.feed.entries.length; i++) {
    var entry = result.feed.entries[i];
    var trTag = document.createElement("tr");
    var tdTagTitle = document.createElement("td");
    var tdTagAuthor = document.createElement("td");
    var tdTagCatgegory = document.createElement("td");
    var tdTagButton = document.createElement("td");
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

    setModalData(i, entry);
    expandBtn.onclick = function(){
      showModal(this);
    };
    $(expandBtn).trigger("click");
  }
}

//create modal that will display feed metadata
function setModalData(btnNum, entry){
  var build = document.getElementById('buildModal');
  var divModal = document.createElement("div");
  var divModalContent = document.createElement("div");
  var divModalHeader = document.createElement("div");
  var spanModal = document.createElement("span");
  var newlineTag = document.createElement("br");

  $(divModal).attr("id","modalFeed"+btnNum);
  $(divModal).addClass("modal");
  $(divModalContent).addClass("modal-content");
  $(divModalHeader).addClass("modal-header");
  $(spanModal).addClass("close");
  $(spanModal).attr("id","spanModal"+btnNum);
  $(spanModal).text("x");

  var imgTag = buildModalImage(entry, newlineTag)
  var divModalBody = buildModalBody(imgTag, entry, newlineTag);

  divModalHeader.appendChild(spanModal);
  divModalContent.appendChild(divModalHeader);
  divModalContent.appendChild(divModalBody);
  divModal.appendChild(divModalContent);
  build.appendChild(divModal);
}

//help function that creates the image on the modal
function buildModalImage(entry, newlineTag){
  var imgTag = document.createElement("img");
  var divImg = document.createElement("div");
  var centerTag = document.createElement("center");

  $(imgTag).attr("src", entry.mediaGroups[0].contents[0].thumbnails[0].url);
  $(divImg).addClass("resizeimg");
  divImg.appendChild(imgTag);
  centerTag.appendChild(divImg);
  centerTag.appendChild(newlineTag);
  return centerTag;
}

//help function that creates the text on the modal
function buildModalBody(imgTag, entry, newlineTag){
  var divModalBody = document.createElement("div");
  var paragraphTitle = document.createElement("p");
  var paragraphContent = document.createElement("p");
  var paragraphLink = document.createElement("p");
  var centerFooterTag = document.createElement("center");

  $(divModalBody).addClass("modal-body");
  $(paragraphTitle).addClass("title");
  $(paragraphLink).append(document.createTextNode("See full post "))
  $(paragraphLink).append("<a href=" + entry.link + ">here.</a>");
  paragraphTitle.appendChild(document.createTextNode(entry.title));
  paragraphContent.appendChild(document.createTextNode(entry.content.substr(0, entry.content.indexOf('<img src'))));
  centerFooterTag.appendChild(paragraphLink)
  divModalBody.appendChild(imgTag);
  divModalBody.appendChild(paragraphTitle);
  divModalBody.appendChild(paragraphContent);
  divModalBody.appendChild(centerFooterTag);

  return divModalBody;
}

//triggers popup of modal on click of the binocular button
function showModal(me){

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
