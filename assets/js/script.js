

function handleConnectionChange() {
  if (navigator.onLine) {
    document.getElementById("ConnectionChange").style.display = 'none';
    console.log("الجهاز أصبح متصلاً بالإنترنت");
  } else {
    document.getElementById("ConnectionChange").style.display = 'block';    
    console.log("الجهاز فقد الاتصال بالإنترنت");
  }
}

window.addEventListener("online", handleConnectionChange);
window.addEventListener("offline", handleConnectionChange);


const recitersId = document.getElementById("recitersId");
const riwayatId  = document.getElementById("riwayatId");
const suwarId    = document.getElementById("suwarId");
const loader     = document.querySelector('.loader');

const apiUrl     = "https://mp3quran.net/api/v3/";
const endPoint   = "reciters";
const lang       = "ar";
async function getReciters() {
  loader.style.display="block";
  const res  = await fetch(`${apiUrl}reciters?language=ar`);
  const data = await res.json();
  recitersId.innerHTML = "<option selected>اختار القارئ</option>";
  data.reciters.forEach((resit) => {
    recitersId.innerHTML += `<option value="${resit.id}">${resit.name}</option>`;
  }
  );
  var optionsArray = Array.from(recitersId.options);
  optionsArray.sort(function (a, b) {
      return a.text.localeCompare(b.text);
  });
  for (var i = 0; i < optionsArray.length; i++) {
    recitersId.options[i] = new Option(optionsArray[i].text, optionsArray[i].value);
  }
  recitersId.innerHTML += "<option selected>اختار القارئ</option>";
  loader.style.display="none";
}
getReciters()
recitersId.onchange = (e) => { getMoshafs(e.target.value) }
async function getMoshafs(resId) {
  loader.style.display="block";
  const res  = await fetch(`${apiUrl}reciters?language=ar&reciter=${resId}`);
  const data = await res.json();
  riwayatId.innerHTML = "<option selected> اختار الرواية</option>";
  data.reciters[0].moshaf.forEach((rw) => {
    riwayatId.innerHTML += `<option name="option1" value="${rw.id}" data-server="${rw.server}" data-list="${rw.surah_list}">${rw.name}</option>`
  }
  );
  riwayatId.onchange = (e) => {
    const selectedMoshaf = riwayatId.options[riwayatId.selectedIndex];
    getSuwar(selectedMoshaf.dataset.server, selectedMoshaf.dataset.list)
  }
  loader.style.display="none";
}
async function getSuwar(suwraServer, suwraList) {
  loader.style.display="block";
  const res         = await fetch(`${apiUrl}suwar?language=ar`);
  const data        = await res.json();
  suwarId.innerHTML = "<option selected>اختار السورة</option>";
  suwraList.split(",").forEach((sl) => {
    const startName = sl.padStart(3, '0')
    data.suwar.forEach((sn) => {
      if (sn.id == sl) {
        suwarId.innerHTML += `<option value="${startName}">${sn.name}</option>`;
      }
    });
  });
  suwarId.onchange = (e) => {
    audioSrc.src   = suwraServer + e.target.value + '.mp3';
    audioSrc.play();
  }
  loader.style.display="none";
}
const playLive = (channel) => {
  loader.style.display="block";
  if (Hls.isSupported()) {
    var video = document.getElementById('liveVideo');
    var hls   = new Hls();
    hls.loadSource(channel);
    hls.attachMedia(video);
    hls.on(Hls.Events.MANIFEST_PARSED, function () {
      video.play();
    });
  }
  loader.style.display="none";
}