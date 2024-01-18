const recitersId = document.getElementById("recitersId");
const riwayatId = document.getElementById("riwayatId");
const suwarId = document.getElementById("suwarId");

const apiUrl = "https://mp3quran.net/api/v3/";
const endPoint = "reciters";
const lang = "ar";
async function getReciters() {
  const res = await fetch(`${apiUrl}reciters?language=ar`);
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
}
getReciters()
recitersId.onchange = (e) => { getMoshafs(e.target.value) }
async function getMoshafs(resId) {
  const res = await fetch(`${apiUrl}reciters?language=ar&reciter=${resId}`);
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
}
async function getSuwar(suwraServer, suwraList) {
  const res = await fetch(`${apiUrl}suwar?language=ar`);
  const data = await res.json();
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
    audioSrc.src = suwraServer + e.target.value + '.mp3';
    audioSrc.play();
  }
}
const playLive = (channel) => {
  if (Hls.isSupported()) {
    var video = document.getElementById('liveVideo');
    var hls = new Hls();
    hls.loadSource(channel);
    hls.attachMedia(video);
    hls.on(Hls.Events.MANIFEST_PARSED, function () {
      video.play();
    });
  }
}