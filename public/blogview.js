function togglefunction() {
  var x = document.getElementById("navbar");
  if (x.style.display == "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}
function displayFunction() {
  var x = document.getElementById("comment-view");
  if (x.style.display == "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}

function smoothScroll(target) {
  const targetElement = document.querySelector(target);
  if (targetElement) {
    const offsetTop =
      targetElement.getBoundingClientRect().top + window.pageYOffset;
    window.scroll({
      top: offsetTop,
      behavior: "smooth",
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const latestBlogLink = document.querySelector("a[href='#latest-blog']");
  const featuredBlogLink = document.querySelector("a[href='#featured-blog']");
  const contactusLink = document.querySelector("a[href='#contactus']");

  if (latestBlogLink) {
    latestBlogLink.addEventListener("click", (e) => {
      e.preventDefault();
      smoothScroll("#latest-blog");
    });
  }

  if (featuredBlogLink) {
    featuredBlogLink.addEventListener("click", (e) => {
      e.preventDefault();
      smoothScroll("#featured-blog");
    });
  }
  if (contactusLink) {
    contactusLink.addEventListener("click", (e) => {
      e.preventDefault();
      smoothScroll("#contactus");
    });
  }
});

$(document).ready(function () {
  $(".like-btn").click(function (event) {
    event.preventDefault();
    const postId = $(this).data("post-id");

    const username = "{{username}}";

    if (!username) {
      const currentURL = window.location.href;
      const loginURL = "/login";
      window.location.href = `${loginURL}?redirect=${encodeURIComponent(
        currentURL
      )}`;
      return;
    }

    $.ajax({
      url: `/like-post/${postId}`,
      method: "POST",
      success: function (response) {
        const likesCount = response.likesCount;
        $(`.like-btn[data-post-id="${postId}"]`).html(
          `${likesCount} <i class="fa-solid fa-thumbs-up"></i>`
        );
      },
      error: function (error) {
        console.error(error);
      },
    });
  });
});

$(document).ready(function () {
  $(".comment-form").submit(function (event) {
    event.preventDefault();

    const username = "{{username}}";

    if (!username) {
      const currentURL = window.location.href;
      const loginURL = "/login";
      window.location.href = `${loginURL}?redirect=${encodeURIComponent(
        currentURL
      )}`;
      return;
    }

    $.ajax({
      type: "POST",
      url: "/comment",
      data: {
        comment: $(this).find('input[name="comment"]').val(),
        postid: $(this).find('input[name="postid"]').val(),
      },
      success: function (response) {
        var existingComment = $("#comment-add-" + response.postid).find(
          '.user-comment[data-postid="' + response.postid + '"]'
        );
        if (existingComment.length === 0) {
          var commentHtml =
            '<div class="user-comment">' +
            '<div class="comment-profile">' +
            '<i class="fa-regular fa-user"></i>' +
            "</div>" +
            '<div class="user-commentdetail">' +
            '<div class="user-commentusername">' +
            "<span>" +
            response.username +
            "</span>" +
            "</div>" +
            '<div class="user-commentcontent">' +
            "<p>" +
            response.comment +
            "</p>" +
            "</div>" +
            "</div>" +
            "</div>";

          $("#comment-add-" + response.postid).prepend(commentHtml);
        }
        $("#comment-form-" + response.postid)[0].reset();
      },
      error: function () {
        alert("Error adding comment");
      },
    });
    return false;
  });
});

$(document).ready(function () {
  function truncateText(text, maxLength) {
    if (text.length > maxLength) {
      return text.substring(0, maxLength - 3) + "....";
    }
    return text;
  }

  function applyTruncation() {
    var maxWidth = $(window).width();
    $(".truncate-title").each(function () {
      var originalTitle = $(this).text(); // Store the original text
      var truncatedTitle;

      if (maxWidth <= 768) {
        truncatedTitle = truncateText(originalTitle, 110);
      } else if (maxWidth <= 991) {
        truncatedTitle = truncateText(originalTitle, 50);
      } else {
        truncatedTitle = originalTitle;
      }

      $(this).text(truncatedTitle);
      $(this).attr("title", originalTitle);
    });
  }

  applyTruncation();

  $(window).resize(function () {
    applyTruncation();
  });
});

$(document).ready(function () {
  function truncateText(text, maxLength) {
    if (text.length > maxLength) {
      return text.substring(0, maxLength - 3) + "....";
    }
    return text;
  }

  function applyTruncation() {
    var maxWidth = $(window).width();
    $(".truncate-title-new").each(function () {
      var originalTitle = $(this).text(); // Store the original text
      var truncatedTitle;

      if (maxWidth <= 768) {
        truncatedTitle = truncateText(originalTitle, 60);
      } else if (maxWidth <= 991) {
        truncatedTitle = truncateText(originalTitle, 50);
      } else {
        truncatedTitle = originalTitle;
      }

      $(this).text(truncatedTitle);
      $(this).attr("title", originalTitle);
    });
  }

  applyTruncation();

  $(window).resize(function () {
    applyTruncation();
  });
});
