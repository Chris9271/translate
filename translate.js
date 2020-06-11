function fetchData() {
    let origin_lan = document.getElementById("lang_origin").value;
    let result_lan = document.getElementById("lang_result").value;
    let input = $("#input").val();

    fetch(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200303T192709Z.18719efe153f92d4.6dde04a56e10b7281691ff8180d8f417d08f1c39
&text=${input}&lang=${origin_lan}-${result_lan}&format=html&options=1`)
        .then((response) => {
            response.json().then((data) => {
                $("#output").val(data.text);
            })
        })
}


function checkLanguage() {
    let input = $("#input").val();
    fetch(`https://translate.yandex.net/api/v1.5/tr.json/detect?key=trnsl.1.1.20200303T192709Z.18719efe153f92d4.6dde04a56e10b7281691ff8180d8f417d08f1c39&text=${input}&hint=en,zh`)
        .then((res) => {
            res.json().then((info) => {
                $("#lang_origin").val(info.lang);
            })
        })
}

function clear() {
    $("#input").val("");
    $("#output").val("");
}

/** Figure out!! **/
function speak() {
    // list of languages is probably not loaded, wait for it
    if (window.speechSynthesis.getVoices().length == 0) {
        window.speechSynthesis.addEventListener('voiceschanged', function () {
            textToSpeech();
        });
    } else {
        // languages list available, no need to wait
        textToSpeech()
    }

    function textToSpeech() {
        let input = $("#input").val();
        let a = $("select option:selected").data("value");
        // get all voices that browser offers
        var available_voices = window.speechSynthesis.getVoices();

        //console.log(available_voices);
        // this will hold an english voice
        var english_voice = '';

        // find voice by language locale "en-US"
        // if not then select the first voice
        for (var i = 0; i < available_voices.length; i++) {

            if (available_voices[i].lang === a) {
                english_voice = available_voices[i];
                break;
            }
        }

        if (english_voice === '')
            english_voice = available_voices[0];

        // new SpeechSynthesisUtterance object
        var utter = new SpeechSynthesisUtterance();
        utter.rate = 1;
        utter.pitch = 0.5;
        utter.text = input;
        utter.voice = english_voice;

        // event after text has been spoken
        utter.onend = function () {
            // alert('Speech has finished');
        }

        // speak
        window.speechSynthesis.speak(utter);
    }

}

$(document).ready(() => {
    $("#bttn").click(() => {
        let outres = $("#output").val();
        let inres = $("#input").val();
        let inchoose = document.getElementById("lang_origin").value;
        let outchoose = document.getElementById("lang_result").value;
        $("#output").val(inres);
        $("#input").val(outres);
        $("#lang_origin").val(outchoose);
        $("#lang_result").val(inchoose);
    })
})

function dictionary(){
    let input = $("#input").val();
    $("#show-input").text(input);
    fetch(`https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=dict.1.1.20200306T193233Z.14e9b507c8e9e060.1f231211ec75b2d129e7091d020420c4ae3138a9
    &lang=en-en&text=${input}`)
    .then((diction)=>{
        diction.json().then((show)=>{
    $("#show-pos").text(`Part of speech: ${show.def[0].pos}`);
    $("#show-ts").text(`Phonogram: ${show.def[0].ts}`);
        })
    })
}
$(document).ready(function () {
    $("#input").on("keyup", function () {
        fetchData();
    })
    $("#input").on("change", function () {
        checkLanguage();
    })
    $("#input").on("dblclick", function () {
        dictionary();
    })
    $(".close").on("click", function () {
        clear();
    })
    $("#speak").on("click", function () {
        speak();
    })
    $("#lang_result").on("change", function () {
        fetchData();

    })
})


// .catch((error) => {
//     console.log(error);
// })
















// function fetchData(name){
//   alert("name")
// }

// $(document).ready(function(){

//     $("#input").on("keyup",function(){ //first cenario call the function
//         fetchData("raphael")
//     })

//     $("#lang_result").on("change",function(){
//         fetchData("raphaeljk")
//     })
// })