const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

function updateActiveLink() {
  let current = 'home';

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 150;
    const sectionBottom = sectionTop + section.offsetHeight;

    if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
      current = section.id;
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove('active');

    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', updateActiveLink);
window.addEventListener('load', updateActiveLink);

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.forEach((item) => {
      item.classList.remove('active');
    });

    link.classList.add('active');
  });
});


const tabs=document.querySelectorAll(".tab"),contents=document.querySelectorAll(".tab-content");

tabs.forEach(tab=>{
tab.addEventListener("click",()=>{
tabs.forEach(t=>t.classList.remove("active"));
contents.forEach(c=>c.classList.remove("active"));
tab.classList.add("active");
document.getElementById(tab.dataset.tab).classList.add("active");
});
});

const center=document.getElementById("donutCenter");
const ctx=document.getElementById("timeSplitChart");

const chart=new Chart(ctx,{
type:"doughnut",
data:{
labels:["Markup","Styling","Scripting","Testing"],
datasets:[{
data:[40,26,20,14],
backgroundColor:["#5146ee","#14b9d1","#ff684b","#ffae31"],
borderWidth:0,
hoverOffset:0,
spacing:2
}]
},
options:{
responsive:true,
maintainAspectRatio:false,
cutout:"67%",
animation:{
duration:900,
easing:"easeOutQuart"
},
plugins:{
legend:{display:false},
tooltip:{
enabled:true,
backgroundColor:"rgba(10,14,25,.88)",
titleColor:"#fff",
bodyColor:"#fff",
padding:12,
cornerRadius:9,
displayColors:true,
boxPadding:5,
callbacks:{
label:function(context){
return " "+context.label+": "+context.raw+"%";
}
}
}
},
onHover:(event,active)=>{
if(active.length){
center.classList.add("hidden");
}else{
center.classList.remove("hidden");
}
}
}
});



$(document).ready(function () {

  const carousel = $(".testimonial-carousel");

  carousel.owlCarousel({
    items: 1,
    loop: true,
    margin: 20,
    autoplay: true,
    autoplayTimeout: 4000,
    autoplayHoverPause: true,
    smartSpeed: 500,
    dots: false,
    nav: false
  });

  $(".next-btn").click(function () {
    carousel.trigger("next.owl.carousel");
  });

  $(".prev-btn").click(function () {
    carousel.trigger("prev.owl.carousel");
  });

  $(".dot").click(function () {
    const index = $(this).data("index");

    carousel.trigger("to.owl.carousel", [index, 500]);

    $(".dot").removeClass("active");
    $(this).addClass("active");
  });

  carousel.on("changed.owl.carousel", function (event) {

    if (!event.namespace) return;

    const current = event.item.index % event.item.count;

    $(".dot").removeClass("active");
    $(".dot").eq(current).addClass("active");

  });

});

const filters = document.querySelectorAll(".filter");
const projectItems = document.querySelectorAll(".project-item");

filters.forEach(filter => {

  filter.addEventListener("click", () => {

    filters.forEach(btn => {
      btn.classList.remove("active");
    });

    filter.classList.add("active");

    const selectedCategory = filter.dataset.filter;

    projectItems.forEach(item => {

      const card = item.querySelector(".project-card");
      const category = card.dataset.category;

      if (
        selectedCategory === "all" ||
        category === selectedCategory
      ) {
        item.classList.remove("hide");
      } else {
        item.classList.add("hide");
      }

    });

  });

});


/* PROJECT MODAL */

const modal = document.getElementById("projectModal");
const modalClose = document.getElementById("modalClose");
const modalOverlay = document.querySelector(".modal-overlay");

const modalTitle = document.getElementById("modalTitle");
const modalCategory = document.getElementById("modalCategory");
const modalDescription = document.getElementById("modalDescription");
const modalTech = document.getElementById("modalTech");

const viewButtons = document.querySelectorAll(".view-project");


viewButtons.forEach(button => {

  button.addEventListener("click", () => {

    const title = button.dataset.title;
    const category = button.dataset.category;
    const tech = button.dataset.tech;
    const description = button.dataset.description;

    modalTitle.textContent = title;
    modalCategory.textContent = category;
    modalDescription.textContent = description;

    modalTech.innerHTML = "";

    tech.split(",").forEach(item => {

      const span = document.createElement("span");

      span.textContent = item.trim();

      modalTech.appendChild(span);

    });

    modal.classList.add("show");

    document.body.style.overflow = "hidden";

  });

});


function closeProjectModal(){

  modal.classList.remove("show");

  document.body.style.overflow = "";

}


modalClose.addEventListener("click", closeProjectModal);

modalOverlay.addEventListener("click", closeProjectModal);


document.addEventListener("keydown", event => {

  if(event.key === "Escape"){
    closeProjectModal();
  }

});


document.addEventListener("DOMContentLoaded", () => {
  // ==========================================
  // 1. MODAL FUNCTIONALITY
  // ==========================================
  const modal = document.getElementById("projectModal");
  const modalCloseBtn = document.getElementById("modalClose");
  const modalCloseBtnFooter = document.getElementById("modalCloseBtn");
  const modalOverlay = document.querySelector(".modal-overlay");

  // Open Modal on Card View Button Click
  document.querySelectorAll(".view-project").forEach((btn) => {
    btn.addEventListener("click", () => {
      // Get attributes from clicked button
      const title = btn.getAttribute("data-title") || "Project Title";
      const techStr = btn.getAttribute("data-tech") || "";
      const description = btn.getAttribute("data-description") || "";
      const client = btn.getAttribute("data-client") || title.split(" ")[0];
      const year = btn.getAttribute("data-year") || "2025";
      const role = btn.getAttribute("data-role") || "Front-end";

      // Populate Modal Content
      document.getElementById("modalTitle").textContent = title;
      document.getElementById("modalDescription").textContent = description;
      document.getElementById("modalClient").textContent = client;
      document.getElementById("modalYear").textContent = year;
      document.getElementById("modalRole").textContent = role;

      // Populate Tech Badges
      const techContainer = document.getElementById("modalTech");
      techContainer.innerHTML = "";
      if (techStr) {
        techStr.split(",").forEach((tech) => {
          const span = document.createElement("span");
          span.textContent = tech.trim();
          techContainer.appendChild(span);
        });
      }

      // Show Modal
      modal.classList.add("active");
    });
  });

  // Close Modal Function
  const closeModal = () => {
    modal.classList.remove("active");
  };

  if (modalCloseBtn) modalCloseBtn.addEventListener("click", closeModal);
  if (modalCloseBtnFooter) modalCloseBtnFooter.addEventListener("click", closeModal);
  if (modalOverlay) modalOverlay.addEventListener("click", closeModal);

  // Close Modal on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closeModal();
    }
  });

  // ==========================================
  // 2. LOAD MORE PROJECTS
  // ==========================================
  const loadMoreBtn = document.getElementById("loadMoreBtn");
  const loadMoreItems = document.querySelectorAll(".load-more-item");

  // Initially hide extra items
  loadMoreItems.forEach((item) => {
    item.style.display = "none";
  });

  if (loadMoreBtn) {
    loadMoreBtn.addEventListener("click", () => {
      loadMoreItems.forEach((item) => {
        item.style.display = "";
      });
      loadMoreBtn.style.display = "none"; // Hide button after clicking
    });
  }

  // ==========================================
  // 3. CATEGORY FILTERING
  // ==========================================
  const filterBtns = document.querySelectorAll(".project-filter .filter");
  const projectItems = document.querySelectorAll(".project-item");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Remove active class from all buttons
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filterValue = btn.getAttribute("data-filter");

      projectItems.forEach((item) => {
        const card = item.querySelector(".project-card");
        const category = card ? card.getAttribute("data-category") : "";

        // If 'Load More' is not clicked yet, respect hidden state for extra cards
        const isLoadMoreItem = item.classList.contains("load-more-item");
        const isLoadMoreVisible = loadMoreBtn && loadMoreBtn.style.display === "none";

        if (filterValue === "all") {
          if (!isLoadMoreItem || isLoadMoreVisible) {
            item.style.display = "";
          } else {
            item.style.display = "none";
          }
        } else {
          if (category === filterValue) {
            item.style.display = "";
          } else {
            item.style.display = "none";
          }
        }
      });
    });
  });
});