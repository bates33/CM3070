$SCRIPT_ROOT = "{{ url_for('newscheck') }}";
$(function () {
  $("#submit").bind("click", function () {
    var news = $("#news").val();
    if (news === "" || news === " " || news === "\n" || news === null) {
      bootbox.alert({
        size: "big",
        title: "No News.",
        message: "Insert some news!",
        backdrop: true,
      });
    } else {
      $.getJSON(
        $SCRIPT_ROOT,
        {
          news: news,
        },
        function (data) {
          var src =
            data.result == "REAL" ? "static/check.gif" : "static/fail.gif";
          bootbox.alert({
            size: "big",
            title: "Prediction",
            message:
              "<div align='center'><h2>News is " +
              data.result +
              "</h2><img style='width:240px;height:232px;' src='" +
              src +
              "'/></div>",
            backdrop: true,
            callback: function () {
              setTimeout(function () {
                location.reload();
              }, 100);
            },
          });
        }
      );
    }
    return false;
  });
});
$(function () {
  function loadCSVAndGenerateNews() {
    $.ajax({
      url: "get_random_news", // Provide the correct path to your CSV file
      dataType: "text",
      success: function (data) {
        var lines = data.split("\n");
        var newsList = [];
        for (var i = 0; i < lines.length; i++) {
          var newsText = lines[i].split(",")[0]; // Assuming the first column contains the news text
          if (newsText.trim() !== "") {
            newsList.push(newsText);
          }
        }
        const randomEntry =
          newsList[Math.floor(Math.random() * newsList.length)];
        $("#news").val(randomEntry);
      },
    });
  }

  // Call the function to load CSV and generate news on page load
  $(document).ready(function () {
    loadCSVAndGenerateNews();
  });

  // Add event listener for the "Generate Random Text" button
  $("#generateRandomText").click(function () {
    $.get("/get_random_news", function (data) {
      $("#news").val(data.random_news);
    });
  });
});

$(function () {
  function loadCSVAndGenerateHeadline() {
    $.ajax({
      url: "get_headline", // Provide the correct path to your CSV file
      dataType: "text",
      success: function (data) {
        var lines = data.split("\n");
        var newsList = [];
        for (var i = 0; i < lines.length; i++) {
          var newsText = lines[i].split(",")[0]; // Assuming the first column contains the news text
          if (newsText.trim() !== "") {
            newsList.push(newsText);
          }
        }
        const randomEntry =
          newsList[Math.floor(Math.random() * newsList.length)];
        $("#news").val(randomEntry);
      },
    });
  }

  // Call the function to load CSV and generate news on page load
  $(document).ready(function () {
    loadCSVAndGenerateHeadline();
  });

  // Add event listener for the "Generate Random Text" button
  $("#generateRandomHeadline").click(function () {
    $.get("/get_headline", function (data) {
      $("#news").val(data.random_news);
    });
  });
});