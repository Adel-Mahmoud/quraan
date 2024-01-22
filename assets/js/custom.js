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

const header = document.querySelector("header");
const sectionOne = document.querySelector(".change-name");

const sectionOneOptions = {
  rootMargin: "-200px 0px 0px 0px"
};

const sectionOneObserver = new IntersectionObserver(function(
  entries,
  sectionOneObserver
) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      header.classList.add("nav-scrolled");
    } else {
      header.classList.remove("nav-scrolled");
    }
  });
},
sectionOneOptions);

sectionOneObserver.observe(sectionOne);
