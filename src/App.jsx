import { useEffect, useState } from "react";
import './App.css'
import MusicPlayer from './MusicPlayer';
function App() {
  //gallery
    const cloudName = "jericy";

    const albums = [
        { folder: "Courting_Stage", title: "Courting Stage", description: "The beginning of our beautiful journey", total: 31 },
        { folder: "1st_Month", title: "1st Month", description: "The start of something special", total: 12 },
    ];

    const getImageUrl = (folder, name) => `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto,w_200/${folder}/${name}.jpg`;
    const getImageUrlHigh = (folder, name) => `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto,w_600/${folder}/${name}.jpg`;
  useEffect(() => {
    // --- Mobile menu toggle ---
    const menuToggle = document.getElementById("menu-toggle");
    const mobileMenu = document.getElementById("mobile-menu");

    if (menuToggle && mobileMenu) {
      menuToggle.addEventListener("click", () => {
        mobileMenu.classList.toggle("hidden");
      });
    }

    // --- Carousel ---
    const carouselItems = document.querySelectorAll(".carousel-item");
    const indicators = document.querySelectorAll(".carousel-indicator");
    let currentIndex = 0;

    function updateCarousel() {
      carouselItems.forEach((item, index) => {
        item.classList.toggle("opacity-100", index === currentIndex);
        item.classList.toggle("opacity-0", index !== currentIndex);
      });

      indicators.forEach((indicator, index) => {
        indicator.classList.toggle("opacity-100", index === currentIndex);
        indicator.classList.toggle("opacity-50", index !== currentIndex);
      });
    }

    const nextBtn = document.getElementById("next-btn");
    const prevBtn = document.getElementById("prev-btn");

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % carouselItems.length;
        updateCarousel();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
        updateCarousel();
      });
    }

    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % carouselItems.length;
      updateCarousel();
    }, 5000);

    // --- Modal ---
    const monthCards = document.querySelectorAll(".month-card");
    const modals = document.querySelectorAll(".modal");
    const closeButtons = document.querySelectorAll(".modal-close");

    monthCards.forEach((card) => {
      card.addEventListener("click", () => {
        const month = card.getAttribute("data-month");
        const modal = document.getElementById(`modal-${month}`);
        if (modal) {
          modal.classList.add("active");
          document.body.style.overflow = "hidden";
        }
      });
    });

    closeButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const modal = button.closest(".modal");
        modal.classList.remove("active");
        document.body.style.overflow = "auto";
      });
    });

    modals.forEach((modal) => {
      modal.addEventListener("click", (e) => {
        if (e.target === modal) {
          modal.classList.remove("active");
          document.body.style.overflow = "auto";
        }
      });
    });

    // Gallery functionality
    const albumCards = document.querySelectorAll('.album-card');
    const galleryModals = document.querySelectorAll('.gallery-modal');
    const galleryCloseButtons = document.querySelectorAll('.gallery-close');
    
    albumCards.forEach(card => {
        card.addEventListener('click', () => {
            const albumId = card.getAttribute('data-album');
            const galleryModal = document.getElementById(`gallery-modal-${albumId}`);
            if (galleryModal) {
              galleryModal.classList.add("active");
              document.body.style.overflow = "hidden";
            }
        });
    });
    
    galleryCloseButtons.forEach(button => {
        button.addEventListener('click', () => {
            const galleryModal = button.closest('.gallery-modal');
            galleryModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });
    
    // Close gallery modal when clicking outside
    galleryModals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    });

    // --- Smooth Scroll ---
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const targetId = this.getAttribute("href");
        if (targetId === "#") return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth" });

          if (mobileMenu) {
            mobileMenu.classList.add("hidden");
          }
        }
      });
    });

    // cleanup (remove event listeners + interval)
    return () => {
      clearInterval(interval);
    };

    


  }, []);
  return (
    <>
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
            <div className="flex items-center">
                <i className="fas fa-heart text-pink-500 text-2xl mr-2 champagne"></i>
                <span className="dancing-script text-2xl font-bold" style={{color: "#b47377"}}>JeriCy</span>
            </div>
            <div className="hidden md:flex space-x-8">
                <a href="#home" className="text-pink-500 hover:text-pink-700 font-medium">Home</a>
                <a href="#gallery" className="text-gray-600 hover:text-pink-500 font-medium">Gallery</a>
                <a href="#monthsary" className="text-gray-600 hover:text-pink-500 font-medium">Monthsary</a>
                <a href="#about" className="text-gray-600 hover:text-pink-500 font-medium">About Us</a>
            </div>
            <div className="md:hidden">
                <button id="menu-toggle" className="text-gray-600 hover:text-pink-500">
                    <i className="fas fa-bars text-2xl"></i>
                </button>
            </div>
        </div>
        {/* mobile menu */}
        <div id="mobile-menu" className="hidden md:hidden bg-white px-4 pb-4">
            <a href="#home" className="block py-2 text-pink-500">Home</a>
            <a href="#gallery" className="block py-2 text-gray-600">Gallery</a>
            <a href="#monthsary" className="block py-2 text-gray-600">Monthsary</a>
            <a href="#about" className="block py-2 text-gray-600">About Us</a>
        </div>
      </nav>

      {/* main content */}
      <main>
          {/*Home Section */}
          <section id="home" className="py-12 px-4">
              <div className="container mx-auto">
                  <h1 className="dancing-script text-4xl md:text-6xl text-center text-pink-500 mb-8">Jerica & Cyrus</h1>
                  
                  {/* Carousel */}
                  <div className="relative w-full max-w-4xl mx-auto h-96 rounded-xl overflow-hidden shadow-lg mb-12">
                      <div className="carousel-item absolute inset-0 w-full h-full carousel-transition opacity-100">
                          <img src={`https://res.cloudinary.com/jericy/image/upload/f_auto,q_auto,w_800/Carousel/img_1.jpg`} alt="Buying snacks para sine" className="w-full h-full object-cover" />
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6 text-white">
                              <p className="dancing-script text-2xl">Our first cinema</p>
                          </div>
                      </div>
                      <div className="carousel-item absolute inset-0 w-full h-full carousel-transition opacity-100">
                          <img src={`https://res.cloudinary.com/jericy/image/upload/f_auto,q_auto,w_800/Carousel/img_2.jpg`} alt="First picture togetherrr" className="w-full h-full object-cover" />
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6 text-white">
                              <p className="dancing-script text-2xl">Our first picture togetherrr!!!</p>
                          </div>
                      </div>
                      <div className="carousel-item absolute inset-0 w-full h-full carousel-transition opacity-100">
                          <img src={`https://res.cloudinary.com/jericy/image/upload/f_auto,q_auto,w_800/Carousel/img_3.jpg`} alt="Unli wingsss" className="w-full h-full object-cover" />
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6 text-white">
                              <p className="dancing-script text-2xl">After sa hehehehe</p>
                          </div>
                      </div>
                      <div className="carousel-item absolute inset-0 w-full h-full carousel-transition opacity-100">
                          <img src={`https://res.cloudinary.com/jericy/image/upload/f_auto,q_auto,w_800/Carousel/img_4.jpg`} alt="Beach" className="w-full h-full object-cover" />
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6 text-white">
                              <p className="dancing-script text-2xl">Beach beach beach</p>
                          </div>
                      </div>
                      <div className="carousel-item absolute inset-0 w-full h-full carousel-transition opacity-100">
                          <img src={`https://res.cloudinary.com/jericy/image/upload/f_auto,q_auto,w_800/Carousel/img_5.jpg`} alt="Motorcycle Ride" className="w-full h-full object-cover" />
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6 text-white">
                              <p className="dancing-script text-2xl">Our first road trip. Nabunturan to Mabini</p>
                          </div>
                      </div>
                      
                      <button id="prev-btn" className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md">
                          <i className="fas fa-chevron-left text-pink-500"></i>
                      </button>
                      <button id="next-btn" className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md">
                          <i className="fas fa-chevron-right text-pink-500"></i>
                      </button>
                      
                      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                          <div className="carousel-indicator w-3 h-3 rounded-full bg-white opacity-50"></div>
                          <div className="carousel-indicator w-3 h-3 rounded-full bg-white opacity-50"></div>
                          <div className="carousel-indicator w-3 h-3 rounded-full bg-white opacity-50"></div>
                          <div className="carousel-indicator w-3 h-3 rounded-full bg-white opacity-50"></div>
                          <div className="carousel-indicator w-3 h-3 rounded-full bg-white opacity-50"></div>
                      </div>
                  </div>
                  
                  <MusicPlayer />
              </div>
          </section>
          
          {/* Gallery Section */}
          <section id="gallery" className="section py-12 px-4">
            <div className="container mx-auto">
                <h2 className="dancing-script text-3xl md:text-5xl text-center text-purple-700 mb-8">Our Gallery</h2>
                <p className="text-center text-gray-700 max-w-2xl mx-auto mb-12">A collection of our precious memories together, each photo telling a story of our journey.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    
                    {albums.map(({ folder, title, description, total }, idx) => {
                        const featured = getImageUrlHigh(folder, "featured");

                        return (
                            <div key={idx} className="album-card bg-white rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition duration-300 cursor-pointer" data-album={idx+1}>
                                <img src={featured} alt={`${title} featured`} className="w-full h-80 object-cover" />
                                <div className="p-4">
                                    <h3 className="text-xl font-semibold text-purple-700">{title}</h3>
                                    <p className="text-gray-600">{description}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
          
          { /* Monthsary Section */}
          <section id="monthsary" className="py-12 px-4">
              <div className="container mx-auto">
                  <h2 className="dancing-script text-3xl md:text-5xl text-center text-pink-500 mb-8">Monthsary Letters</h2>
                  <p className="text-center text-gray-700 max-w-2xl mx-auto mb-12">Click on a month card to read my love letter for that special month.</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      {/* Month Cards */}
                      <div className="month-card bg-white rounded-xl p-6 shadow-lg text-center transform hover:scale-105 transition duration-300 cursor-pointer" data-month="1">
                          <div className="mb-4">
                              <div className="inline-block p-4 bg-pink-100 rounded-full">
                                  <i className="fas fa-heart text-2xl text-pink-500 heartbeat"></i>
                              </div>
                          </div>
                          <h3 className="text-xl font-semibold text-purple-700">1st Month</h3>
                          <p className="text-gray-600">September 23, 2025</p>
                      </div>
                      
                      <div className="month-card bg-white rounded-xl p-6 shadow-lg text-center transform hover:scale-105 transition duration-300 cursor-pointer" data-month="2">
                          <div className="mb-4">
                              <div className="inline-block p-4 bg-pink-100 rounded-full">
                                  <i className="fas fa-heart text-2xl text-pink-500"></i>
                              </div>
                          </div>
                          <h3 className="text-xl font-semibold text-purple-700">2nd Month</h3>
                          <p className="text-gray-600">October 23, 2025</p>
                      </div>
                      
                      <div className="month-card bg-white rounded-xl p-6 shadow-lg text-center transform hover:scale-105 transition duration-300 cursor-pointer" data-month="3">
                          <div className="mb-4">
                              <div className="inline-block p-4 bg-pink-100 rounded-full">
                                  <i className="fas fa-heart text-2xl text-pink-500"></i>
                              </div>
                          </div>
                          <h3 className="text-xl font-semibold text-purple-700">3rd Month</h3>
                          <p className="text-gray-600">November 23, 2025</p>
                      </div>
                      <div className="month-card bg-white rounded-xl p-6 shadow-lg text-center transform hover:scale-105 transition duration-300 cursor-pointer" data-month="4">
                          <div className="mb-4">
                              <div className="inline-block p-4 bg-pink-100 rounded-full">
                                  <i className="fas fa-heart text-2xl text-pink-500"></i>
                              </div>
                          </div>
                          <h3 className="text-xl font-semibold text-purple-700">4th Month</h3>
                          <p className="text-gray-600">December 23, 2025</p>
                      </div>
                      <div className="month-card bg-white rounded-xl p-6 shadow-lg text-center transform hover:scale-105 transition duration-300 cursor-pointer" data-month="5">
                          <div className="mb-4">
                              <div className="inline-block p-4 bg-pink-100 rounded-full">
                                  <i className="fas fa-heart text-2xl text-pink-500"></i>
                              </div>
                          </div>
                          <h3 className="text-xl font-semibold text-purple-700">5th Month</h3>
                          <p className="text-gray-600">January 23, 2026</p>
                      </div>
                      <div className="month-card bg-white rounded-xl p-6 shadow-lg text-center transform hover:scale-105 transition duration-300 cursor-pointer" data-month="6">
                          <div className="mb-4">
                              <div className="inline-block p-4 bg-pink-100 rounded-full">
                                  <i className="fas fa-heart text-2xl text-pink-500"></i>
                              </div>
                          </div>
                          <h3 className="text-xl font-semibold text-purple-700">6th Month</h3>
                          <p className="text-gray-600">February 23, 2026</p>
                      </div>
                      <div className="month-card bg-white rounded-xl p-6 shadow-lg text-center transform hover:scale-105 transition duration-300 cursor-pointer" data-month="7">
                          <div className="mb-4">
                              <div className="inline-block p-4 bg-pink-100 rounded-full">
                                  <i className="fas fa-heart text-2xl text-pink-500"></i>
                              </div>
                          </div>
                          <h3 className="text-xl font-semibold text-purple-700">7th Month</h3>
                          <p className="text-gray-600">March 23, 2026</p>
                      </div>
                      <div className="month-card bg-white rounded-xl p-6 shadow-lg text-center transform hover:scale-105 transition duration-300 cursor-pointer" data-month="8">
                          <div className="mb-4">
                              <div className="inline-block p-4 bg-pink-100 rounded-full">
                                  <i className="fas fa-heart text-2xl text-pink-500"></i>
                              </div>
                          </div>
                          <h3 className="text-xl font-semibold text-purple-700">8th Month</h3>
                          <p className="text-gray-600">April 23, 2026</p>
                      </div>
                      <div className="month-card bg-white rounded-xl p-6 shadow-lg text-center transform hover:scale-105 transition duration-300 cursor-pointer" data-month="9">
                          <div className="mb-4">
                              <div className="inline-block p-4 bg-pink-100 rounded-full">
                                  <i className="fas fa-heart text-2xl text-pink-500"></i>
                              </div>
                          </div>
                          <h3 className="text-xl font-semibold text-purple-700">9th Month</h3>
                          <p className="text-gray-600">May 23, 2026</p>
                      </div>
                      <div className="month-card bg-white rounded-xl p-6 shadow-lg text-center transform hover:scale-105 transition duration-300 cursor-pointer" data-month="10">
                          <div className="mb-4">
                              <div className="inline-block p-4 bg-pink-100 rounded-full">
                                  <i className="fas fa-heart text-2xl text-pink-500"></i>
                              </div>
                          </div>
                          <h3 className="text-xl font-semibold text-purple-700">10th Month</h3>
                          <p className="text-gray-600">June 23, 2026</p>
                      </div>
                      <div className="month-card bg-white rounded-xl p-6 shadow-lg text-center transform hover:scale-105 transition duration-300 cursor-pointer" data-month="11">
                          <div className="mb-4">
                              <div className="inline-block p-4 bg-pink-100 rounded-full">
                                  <i className="fas fa-heart text-2xl text-pink-500"></i>
                              </div>
                          </div>
                          <h3 className="text-xl font-semibold text-purple-700">11th Month</h3>
                          <p className="text-gray-600">July 23, 2026</p>
                      </div>
                      <div className="month-card bg-white rounded-xl p-6 shadow-lg text-center transform hover:scale-105 transition duration-300 cursor-pointer" data-month="12">
                          <div className="mb-4">
                              <div className="inline-block p-4 bg-pink-100 rounded-full">
                                  <i className="fas fa-heart text-2xl text-pink-500"></i>
                              </div>
                          </div>
                          <h3 className="text-xl font-semibold text-purple-700">12th Month</h3>
                          <p className="text-gray-600">August 23, 2026</p>
                      </div>
                      <div className="month-card bg-white rounded-xl p-6 shadow-lg text-center transform hover:scale-105 transition duration-300 cursor-pointer" data-month="13">
                          <div className="mb-4">
                              <div className="inline-block p-4 bg-pink-100 rounded-full">
                                  <i className="fas fa-heart text-2xl text-pink-500"></i>
                              </div>
                          </div>
                          <h3 className="text-xl font-semibold text-purple-700">9999th Month</h3>
                          <p className="text-gray-600">August 23, 2125</p>
                      </div>
                  </div>
              </div>
          </section>
          
          {/* About Us Section 
          <section id="about" className="py-12 px-4 bg-lavender">
              <div className="container mx-auto">
                  <h2 className="dancing-script text-3xl md:text-5xl text-center text-purple-700 mb-8">Our Story</h2>
                  
                  <div className="flex flex-col md:flex-row items-center max-w-5xl mx-auto">
                      <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
                          <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80" alt="Woman with beautiful smile in natural lighting" className="rounded-xl shadow-lg" />
                      </div>
                      <div className="md:w-1/2">
                          <h3 className="text-2xl font-semid-bold text-purple-700 mb-4">How We Met</h3>
                          <p className="text-gray-700 mb-4">
                            I saw you first sa Social Media, particulary in Instagram. It's not like a random meet-up at cafe or somewhere like the others, but it feels the same.
                            At first I thought it's just nothing, but you keep on appearing sa akoang feed haha Then I ask my friends sa imohang name.
                            After nako  nakabalo saimohang name, wala gihapon ko ning contact nimo, because feel nako dili pa ko ready, kay daghan pasab kog ayohon sa akong kinabuhi.
                            Pero nagkadugay, naka ingon kos akong kaugalingon nga mura mag walay bag-o sa akong self, nya if maghulat ko kung kanus-a ko maka feel nga ready, basi ug late na.
                            Soooo, sakto jud diay ang ingon nila nga "Ready is not a feeling, it's a decision".
                            Mao to nag take risk ko nga mag reply saimohang NGL HAHAHA.
                            </p>
                          <p className="text-gray-700 mb-4">

                             </p>
                          
                          <h3 className="text-2xl font-semibold text-purple-700 mt-8 mb-4">Our Journey</h3>
                          <p className="text-gray-700 mb-4">What started as friendship gradually blossomed into something beautiful. Our first date, our first laugh together, our first adventure - each moment has been a treasure.</p>
                          <p className="text-gray-700">I feel incredibly lucky to have you in my life, and I look forward to creating many more beautiful memories together.</p>
                      </div>
                  </div>
              </div>
          </section>*/}
      </main>
    
      {/* Letter Modals */}
      {/* 1st Month Modal */}
      <div id="modal-1" className="modal fixed inset-0 flex items-center justify-center z-50">
          <div className="modal-overlay absolute inset-0"></div>
          <div className="modal-container bg-white w-11/12 md:max-w-2xl mx-auto rounded-xl shadow-lg z-50 overflow-y-auto max-h-screen">
              <div className="modal-content py-4 px-6">
                  <div className="flex justify-between items-center pb-3">
                      <div className="modal-close cursor-pointer z-50 p-2">
                          <i className="fas fa-times text-gray-500 hover:text-gray-700"></i>
                      </div>
                  </div>
                  <div className="px-6 pb-6">
                      <div className="bg-pink-50 p-6 rounded-lg mb-6">
                          <h2 className="dancing-script text-3xl text-center text-pink-500">1st Monthsary</h2>
                          <p className="text-center text-gray-600">September 23, 2025</p>
                      </div>
                      
                      <div className="letter-content">
                          <p className="dancing-script text-xl text-gray-700 mb-4">Hi Ai,</p>
                          <p className="text-gray-700 mb-4">HAPPY FIRSTTT MONTHSARYYYY AIIIII!!!</p>
                          <p className="text-gray-700 mb-4">First of all, I thank God kay gi-answer jud niya ang akoang prayers. Yes, gipag-pray nako ni God nga unta ikaw na, and thankful jud pud ko kay nagka-kita gyud.</p>
                          <p className="text-gray-700 mb-4">Paspas ra kaayo ang panahon no? 1 month na ta karon, nag sugod kog panguyab saimo sige pa ta ug kuyog, pero 2 days ra ta ga-kuyog nga uyab na hahaha LDR yarn. Ka-remember ko sa first chat2 nato, ga-dula ko ato ug Valorant with my students, tapos natingala sila nganong wala na galihok akoang character HAHAHAHAHA nya pagtan-aw nila nako kay ga-cellphone nya ga-ngisi HAHAHAHAHA palag kaayo sila ato.</p>
                          <p className="text-gray-700 mb-4">Atoang first meet gyud kay di nako malimtan kay gaabot ra sa kanto sa inyoha kay naghatod ug Jabee HAHAHAHAHA literal nga dili pugngan diba? Mao biya na imong shared post ato HAHAHAHA. Tapos maygaliii nasundan, nanghagad ko nimo, girason ra nako ang silent sanctuary para magkuyog ta hahahaha pero kabalo ka didtoa sa compostela ato, gikilig ko kay naka feel ko ba nga murag mao najud ni HAHAHA kay ambot, kato man tong dili nako dawaton imohang 500 palit ug pagkaon nya gisipatan ko nimo HAHAHAHA wala ko naganahi tungod sa 500, naganahan kos feeling nga mura ko nimog gikasab-an nga mura tag uyab hahahaha. Tapos next natong kita kay katong palakaw na ko, dinner2 bago mag lagyo balik kay mubalik na sa Dipolog, kabalo ka kulbaan kayko ato kay wa ko kabalo mag unsa ko, unsay isulti, unsay istoryaan HAHAHAHA maygali na-success rasab ang dinner, with video pa.</p>
                          <p className="text-gray-700 mb-4">Tapos diba pabalik na ko ug Dipolog, ganahan kaayo kos feeling ato ai kay effort kaayo ka sakoa ato nga mumata ka para pukawon ko, uhm even before man tong wala pa ta nagkita, pero yeah, ganahan kaykos feeling ato, yahaya ba nako para maka experience ani.</p>
                          <p className="text-gray-700 mb-4">Thank you so much, Ai, for everything, sa pag love sa akoa, sa pag care sa akoa, ug sa walay sawa nga pag-sabot sa akoa. Kabalo ba ka nga before ta nag ila kay ana kos akoang self nga "Dili najud ko magpaka-honest sa sunod", pero pag-ila nato, bawi ra gihapon nako na nga mga istorya kay gusto nako ihatag akoang best saimoha. I want you in my life, forever. Gusto nako kitang duha honest ta sa usa'g usa, and safe tang duha nga di ta mabalaka.
                          </p>
                          <p className="text-gray-700 mb-4">Thank you sab kaayo Ai sa pag consider sa akoang feelings, bisan pa man tuod nga naa koy sigehan ug balik nga istorya, motubag ra gihapon ka and nag stay ra gihapon ka. THANK YOU KAAYOOO ANAAAA!!! And sorry sab ana Ai, gusto lang man gud nako nga ako lang HAHAHA bitaw Ai, gusto lang gud nako i-address na nga mga issue samtang sayo pa kaysa naman ginahilom ra nako na, mas lain sab hinuon, maayo manang kabalo ka sa unsay problem nako diba para ma-solutionan natong duha. Thank you again Ai sa pag sabot ana.</p>
                          <p className="text-gray-700 mb-4">Sorry sab Ai sa akong batasan, sa akoang ka-luoran, sa akong ka-clingy, ug sa tanang dili nimo ganahan. Pero gina work nako na Ai kay para mahatag nako akoang best saimoha, dili ko ganahan mag stay sa kung unsa ko kung dili ka ganahan ana.</p>
                          <p className="text-gray-700 mb-4">Kuan sab diay Ai, atoang first kiss hihi ambot kabantay ba ka anang gina kiss tika sa forehead sauna, basta mao nay una ayha sa cheek tapos sa lips.</p>
                          <p className="text-gray-700 mb-4">Naa lang koy mga pangayoon saimoha Ai, ipabilin imohang trust, imohang pagka honest, and pagka loyal. Pangayoon nako na saimoha kay ihatag sab nako na saimoha. I believe man gud nga kita jud kung gustohon nato nga magkita, kung pilion nato nga mag trust sa usa'g usa, kung pilion nato magpaka honest sa usa'g usa, and magpaka loyal sa usa'g usa. Walay makaguba sa love kung both ta ga-work ana.</p>
                          <p className="text-gray-700 mb-4">Kabalo ko Ai nga maabot jud ang adlaw nga makatilaw ta ug grabi nga away, unta pilion nato ang usa'g usa ana Ai. Sige ra kay puhon kung makaya na, pakaslan gyud dayon tika.</p>
                          <p className="text-gray-700 mb-4">Naa koy iingon, kabalo ba ka nga kaning message kay gibuhat nako karon lang gyud pag uli namo gikan nagtaod cctv HAHAHAHA diba ana ko nimo naa sa koy buhaton, mao ni Ai, kay namali man ko gud ug estimate, abi nakog kauli nami karong adlawa sa Iligan HAHAHAHA maygali ma-control ra nako ang computer didtoa para ma-upload nako sa online kay para ma-edit nako diria. hahahaha</p>
                          <p className="text-gray-700 mb-4">Unta ganahan ra kas akong gibuhat nga website Aiii, mao ni akoang plano before pa ka nag hisgot anang website, mao to gina push nako saimoha ang sa account nalang ka mag post HAHAHAHA</p>
                          <p className="text-gray-700 mb-4">I LOVE YOUUUU!!! I MISS YOUUUUU!!! Mingaw nakos imoha Aiii, sa imong touch, kiss, ug hug... ug patong. HAHHAHAHA Basi tingala ka ha nikatawa kog kalit diri while ga video call ta HAHAHAHA wala intawon koy ka-chat lain Aiii, ikaw lang po wala nang iba.</p>
                          <p className="text-gray-700 mb-4">Happy Monthsary usab Aiiii!!!</p>
                          <p className="dancing-script text-xl text-gray-700 mt-8">Forever yours,<br/>Cyrus Conde na mahal na mahal ka</p>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    
      {/* Second Month Modal */}
      <div id="modal-2" className="modal fixed inset-0 flex items-center justify-center z-50">
          <div className="modal-overlay absolute inset-0"></div>
          <div className="modal-container bg-white w-11/12 md:max-w-2xl mx-auto rounded-xl shadow-lg z-50 overflow-y-auto max-h-screen">
              <div className="modal-content py-4 px-6">
                  <div className="flex justify-between items-center pb-3">
                      <div className="modal-close cursor-pointer z-50 p-2">
                          <i className="fas fa-times text-gray-500 hover:text-gray-700"></i>
                      </div>
                  </div>
                  <div className="px-6 pb-6">
                      <div className="bg-pink-50 p-6 rounded-lg mb-6">
                          <h2 className="dancing-script text-3xl text-center text-pink-500">2nd Monthsary</h2>
                          <p className="text-center text-gray-600">Coming Soon</p>
                      </div>
                      
                      <div className="letter-content text-center">
                          <i className="fas fa-heart text-5xl text-pink-300 mb-6"></i>
                          <p className="text-gray-700">Our next beautiful chapter is being written...</p>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    
      {/* 3rd Month Modal */}
      <div id="modal-3" className="modal fixed inset-0 flex items-center justify-center z-50">
          <div className="modal-overlay absolute inset-0"></div>
          <div className="modal-container bg-white w-11/12 md:max-w-2xl mx-auto rounded-xl shadow-lg z-50 overflow-y-auto max-h-screen">
              <div className="modal-content py-4 px-6">
                  <div className="flex justify-between items-center pb-3">
                      <div className="modal-close cursor-pointer z-50 p-2">
                          <i className="fas fa-times text-gray-500 hover:text-gray-700"></i>
                      </div>
                  </div>
                  <div className="px-6 pb-6">
                      <div className="bg-pink-50 p-6 rounded-lg mb-6">
                          <h2 className="dancing-script text-3xl text-center text-pink-500">3rd Monthsary</h2>
                          <p className="text-center text-gray-600">November 23, 2025</p>
                      </div>
                      {/*
                      <div className="letter-content">
                          <i className="fas fa-heart text-5xl text-pink-300 mb-6"></i>
                          <p className="dancing-script text-xl text-gray-700 mb-4">Hello Ai,</p>
                          <p className="text-gray-700 mb-4">I wanna start this message with a thank you. Thank you, God,
                            for guiding us, for letting us get through sa 3 months of our love. And thank you, Ai, for being you. I love you.
                          </p>
                          <p className="text-gray-700 mb-4">
                            On our 2nd month, I will not say anything anymore about that para dili na ta magbalik ana nga istorya. Sorry.
                          </p>
                          <p className="text-gray-700 mb-4">
                            Today marks our 3rd month of love, but I don't know where to start. Should I start about why am I hurting? or should I express my love first?
                            Ah... maybe I could ask a question first. Tell me what you really feel right now, do you still love me the same?
                            Did you even know that I wasn't crying because gina-singkahan ko nimo? I was crying because sakit kaayo sa akoa kung unsa man ang nahitabo ana.
                            </p>
                          <p className="text-gray-700 mb-4">  Ai, sakit gud kaayo, nasakitan kaayo ko, I hope ma-realize nimo na. Dili nako mag istorya pa ug daghan about ani kay ingnan ra gihapon ko nimog reklamador, but if you want nga istoryahan nato nig tarong, lemme know.
                            </p>
                            <p className="text-gray-700 mb-4"> I am just hoping nga tumanon nimo kung unsa atong mga nasabotan. Kung unsa imong gipang promise sa akoa. No matter what.
                            Also I am hoping that you'll set boundaries, just please protect my peace.
                            There's only one thing that I want you to keep in your mind. Do not ever say a word you can't fulfill, because I have a good memory when it comes to promises, and I am being left disappointed.
                            </p>
                            <p className="text-gray-700 mb-4"> Dili ko ganahan mabalik kos akong toxic side ai, nga i-mirror ug unsay ginapakita sa akoa. Pero I think I must lower my expectations and efforts para dili ko ma-drain. Kay love man tika kaayo, gusto nako ni i-fight hangtod buhi pa.
                            </p><p className="text-gray-700 mb-4">
                            Muingon ka ug mali ni tanan akong gi-message diri? No. I saw your efforts Ai, and I appreciate that, no joke.
                            I saw how you tried pleasing me to meet my expectations, how you supported me, and how you loved me.
                            Thank you so much, Ai! Thank you for loving me. I love you so much. I love you forever!
                            </p>
                            <p className="text-gray-700 mb-4">
                            I know that this is just a challenge for us. No relationship is perfect. God is testing us if we can survive the challenge. I love you.
                            </p>
                            <p className="text-gray-700 mb-4">
                                Ayaw gyud pag buang2 kay ikaw raba ang emergency contact nako sa among company HAHAHAHA bitaw. I love you so much, Ai.
                                I am sorry for everything. I hope dili ka kapoyon sa akoa. Love tika kaayo sobraaaaa!!!
                            </p>
                            <p className="text-gray-700 mb-4">
                                I dunno if naa bay mga mamali nimo ug sabot diri, or di ka uyon, or ambot unsa bay mga negative dinha. If so, just tell me ha.
                            </p>
                            <p className="text-gray-700 mb-4">
                                Happy 3rd month, Ai. I LOVE YOU FOREVER!!!
                            </p>
                            <p className="dancing-script text-xl text-gray-700 mt-8">Forever yours,<br/>Cyrus Conde gwapo</p>
                            
                      </div>
                       */}
                  </div>
              </div>
          </div>
      </div>
      {/* 4th Month Modal */}
      <div id="modal-4" className="modal fixed inset-0 flex items-center justify-center z-50">
          <div className="modal-overlay absolute inset-0"></div>
          <div className="modal-container bg-white w-11/12 md:max-w-2xl mx-auto rounded-xl shadow-lg z-50 overflow-y-auto max-h-screen">
              <div className="modal-content py-4 px-6">
                  <div className="flex justify-between items-center pb-3">
                      <div className="modal-close cursor-pointer z-50 p-2">
                          <i className="fas fa-times text-gray-500 hover:text-gray-700"></i>
                      </div>
                  </div>
                  <div className="px-6 pb-6">
                      <div className="bg-pink-50 p-6 rounded-lg mb-6">
                          <h2 className="dancing-script text-3xl text-center text-pink-500">4th Monthsary</h2>
                          <p className="text-center text-gray-600">Coming Soon</p>
                      </div>
                      
                      <div className="letter-content text-center">
                          <i className="fas fa-heart text-5xl text-pink-300 mb-6"></i>
                          <p className="text-gray-700">Our next beautiful chapter is being written...</p>
                      </div>
                  </div>
              </div>
          </div>
      </div>
      {/* 5th Month Modal */}
      <div id="modal-5" className="modal fixed inset-0 flex items-center justify-center z-50">
          <div className="modal-overlay absolute inset-0"></div>
          <div className="modal-container bg-white w-11/12 md:max-w-2xl mx-auto rounded-xl shadow-lg z-50 overflow-y-auto max-h-screen">
              <div className="modal-content py-4 px-6">
                  <div className="flex justify-between items-center pb-3">
                      <div className="modal-close cursor-pointer z-50 p-2">
                          <i className="fas fa-times text-gray-500 hover:text-gray-700"></i>
                      </div>
                  </div>
                  <div className="px-6 pb-6">
                      <div className="bg-pink-50 p-6 rounded-lg mb-6">
                          <h2 className="dancing-script text-3xl text-center text-pink-500">5th Monthsary</h2>
                          <p className="text-center text-gray-600">Coming Soon</p>
                      </div>
                      
                      <div className="letter-content text-center">
                          <i className="fas fa-heart text-5xl text-pink-300 mb-6"></i>
                          <p className="text-gray-700">Our next beautiful chapter is being written...</p>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    
      {/* 6th Month Modal */}
      <div id="modal-6" className="modal fixed inset-0 flex items-center justify-center z-50">
          <div className="modal-overlay absolute inset-0"></div>
          <div className="modal-container bg-white w-11/12 md:max-w-2xl mx-auto rounded-xl shadow-lg z-50 overflow-y-auto max-h-screen">
              <div className="modal-content py-4 px-6">
                  <div className="flex justify-between items-center pb-3">
                      <div className="modal-close cursor-pointer z-50 p-2">
                          <i className="fas fa-times text-gray-500 hover:text-gray-700"></i>
                      </div>
                  </div>
                  <div className="px-6 pb-6">
                      <div className="bg-pink-50 p-6 rounded-lg mb-6">
                          <h2 className="dancing-script text-3xl text-center text-pink-500">6th Monthsary</h2>
                          <p className="text-center text-gray-600">Coming Soon</p>
                      </div>
                      
                      <div className="letter-content text-center">
                          <i className="fas fa-heart text-5xl text-pink-300 mb-6"></i>
                          <p className="text-gray-700">Our next beautiful chapter is being written...</p>
                      </div>
                  </div>
              </div>
          </div>
      </div>
      {/* 7th Month Modal */}
      <div id="modal-7" className="modal fixed inset-0 flex items-center justify-center z-50">
          <div className="modal-overlay absolute inset-0"></div>
          <div className="modal-container bg-white w-11/12 md:max-w-2xl mx-auto rounded-xl shadow-lg z-50 overflow-y-auto max-h-screen">
              <div className="modal-content py-4 px-6">
                  <div className="flex justify-between items-center pb-3">
                      <div className="modal-close cursor-pointer z-50 p-2">
                          <i className="fas fa-times text-gray-500 hover:text-gray-700"></i>
                      </div>
                  </div>
                  <div className="px-6 pb-6">
                      <div className="bg-pink-50 p-6 rounded-lg mb-6">
                          <h2 className="dancing-script text-3xl text-center text-pink-500">7th Monthsary</h2>
                          <p className="text-center text-gray-600">Coming Soon</p>
                      </div>
                      
                      <div className="letter-content text-center">
                          <i className="fas fa-heart text-5xl text-pink-300 mb-6"></i>
                          <p className="text-gray-700">Our next beautiful chapter is being written...</p>
                      </div>
                  </div>
              </div>
          </div>
      </div>
      {/* 8th Month Modal */}
      <div id="modal-8" className="modal fixed inset-0 flex items-center justify-center z-50">
          <div className="modal-overlay absolute inset-0"></div>
          <div className="modal-container bg-white w-11/12 md:max-w-2xl mx-auto rounded-xl shadow-lg z-50 overflow-y-auto max-h-screen">
              <div className="modal-content py-4 px-6">
                  <div className="flex justify-between items-center pb-3">
                      <div className="modal-close cursor-pointer z-50 p-2">
                          <i className="fas fa-times text-gray-500 hover:text-gray-700"></i>
                      </div>
                  </div>
                  <div className="px-6 pb-6">
                      <div className="bg-pink-50 p-6 rounded-lg mb-6">
                          <h2 className="dancing-script text-3xl text-center text-pink-500">8th Monthsary</h2>
                          <p className="text-center text-gray-600">Coming Soon</p>
                      </div>
                      
                      <div className="letter-content text-center">
                          <i className="fas fa-heart text-5xl text-pink-300 mb-6"></i>
                          <p className="text-gray-700">Our next beautiful chapter is being written...</p>
                      </div>
                  </div>
              </div>
          </div>
      </div>
      {/* 9th Month Modal */}
      <div id="modal-9" className="modal fixed inset-0 flex items-center justify-center z-50">
          <div className="modal-overlay absolute inset-0"></div>
          <div className="modal-container bg-white w-11/12 md:max-w-2xl mx-auto rounded-xl shadow-lg z-50 overflow-y-auto max-h-screen">
              <div className="modal-content py-4 px-6">
                  <div className="flex justify-between items-center pb-3">
                      <div className="modal-close cursor-pointer z-50 p-2">
                          <i className="fas fa-times text-gray-500 hover:text-gray-700"></i>
                      </div>
                  </div>
                  <div className="px-6 pb-6">
                      <div className="bg-pink-50 p-6 rounded-lg mb-6">
                          <h2 className="dancing-script text-3xl text-center text-pink-500">9th Monthsary</h2>
                          <p className="text-center text-gray-600">Coming Soon</p>
                      </div>
                      
                      <div className="letter-content text-center">
                          <i className="fas fa-heart text-5xl text-pink-300 mb-6"></i>
                          <p className="text-gray-700">Our next beautiful chapter is being written...</p>
                      </div>
                  </div>
              </div>
          </div>
      </div>
      {/* 10th Month Modal */}
      <div id="modal-10" className="modal fixed inset-0 flex items-center justify-center z-50">
          <div className="modal-overlay absolute inset-0"></div>
          <div className="modal-container bg-white w-11/12 md:max-w-2xl mx-auto rounded-xl shadow-lg z-50 overflow-y-auto max-h-screen">
              <div className="modal-content py-4 px-6">
                  <div className="flex justify-between items-center pb-3">
                      <div className="modal-close cursor-pointer z-50 p-2">
                          <i className="fas fa-times text-gray-500 hover:text-gray-700"></i>
                      </div>
                  </div>
                  <div className="px-6 pb-6">
                      <div className="bg-pink-50 p-6 rounded-lg mb-6">
                          <h2 className="dancing-script text-3xl text-center text-pink-500">10th Monthsary</h2>
                          <p className="text-center text-gray-600">Coming Soon</p>
                      </div>
                      
                      <div className="letter-content text-center">
                          <i className="fas fa-heart text-5xl text-pink-300 mb-6"></i>
                          <p className="text-gray-700">Our next beautiful chapter is being written...</p>
                      </div>
                  </div>
              </div>
          </div>
      </div>
      {/* 11th Month Modal */}
      <div id="modal-11" className="modal fixed inset-0 flex items-center justify-center z-50">
          <div className="modal-overlay absolute inset-0"></div>
          <div className="modal-container bg-white w-11/12 md:max-w-2xl mx-auto rounded-xl shadow-lg z-50 overflow-y-auto max-h-screen">
              <div className="modal-content py-4 px-6">
                  <div className="flex justify-between items-center pb-3">
                      <div className="modal-close cursor-pointer z-50 p-2">
                          <i className="fas fa-times text-gray-500 hover:text-gray-700"></i>
                      </div>
                  </div>
                  <div className="px-6 pb-6">
                      <div className="bg-pink-50 p-6 rounded-lg mb-6">
                          <h2 className="dancing-script text-3xl text-center text-pink-500">11th Monthsary</h2>
                          <p className="text-center text-gray-600">Coming Soon</p>
                      </div>
                      
                      <div className="letter-content text-center">
                          <i className="fas fa-heart text-5xl text-pink-300 mb-6"></i>
                          <p className="text-gray-700">Our next beautiful chapter is being written...</p>
                      </div>
                  </div>
              </div>
          </div>
      </div>
      {/* 12th Month Modal */}
      <div id="modal-12" className="modal fixed inset-0 flex items-center justify-center z-50">
          <div className="modal-overlay absolute inset-0"></div>
          <div className="modal-container bg-white w-11/12 md:max-w-2xl mx-auto rounded-xl shadow-lg z-50 overflow-y-auto max-h-screen">
              <div className="modal-content py-4 px-6">
                  <div className="flex justify-between items-center pb-3">
                      <div className="modal-close cursor-pointer z-50 p-2">
                          <i className="fas fa-times text-gray-500 hover:text-gray-700"></i>
                      </div>
                  </div>
                  <div className="px-6 pb-6">
                      <div className="bg-pink-50 p-6 rounded-lg mb-6">
                          <h2 className="dancing-script text-3xl text-center text-pink-500">12th Monthsary</h2>
                          <p className="text-center text-gray-600">Coming Soon</p>
                      </div>
                      
                      <div className="letter-content text-center">
                          <i className="fas fa-heart text-5xl text-pink-300 mb-6"></i>
                          <p className="text-gray-700">Our next beautiful chapter is being written...</p>
                      </div>
                  </div>
              </div>
          </div>
      </div>
      {/* 9999th Month Modal */}
      <div id="modal-13" className="modal fixed inset-0 flex items-center justify-center z-50">
          <div className="modal-overlay absolute inset-0"></div>
          <div className="modal-container bg-white w-11/12 md:max-w-2xl mx-auto rounded-xl shadow-lg z-50 overflow-y-auto max-h-screen">
              <div className="modal-content py-4 px-6">
                  <div className="flex justify-between items-center pb-3">
                      <div className="modal-close cursor-pointer z-50 p-2">
                          <i className="fas fa-times text-gray-500 hover:text-gray-700"></i>
                      </div>
                  </div>
                  <div className="px-6 pb-6">
                      <div className="bg-pink-50 p-6 rounded-lg mb-6">
                          <h2 className="dancing-script text-3xl text-center text-pink-500">9999th Monthsary</h2>
                          <p className="text-center text-gray-600">Coming Soon</p>
                      </div>
                      
                      <div className="letter-content text-center">
                          <i className="fas fa-heart text-5xl text-pink-300 mb-6"></i>
                          <p className="text-gray-700">Our next beautiful chapter is being written...</p>
                      </div>
                  </div>
              </div>
          </div>
      </div>
      {/* Gallery Modals*/}
      {albums.map(({ folder, title, total }, idx) => {
        const featured = getImageUrl(folder, "featured");
        const numberedImages = Array.from({ length: total }, (_, i) =>
          getImageUrl(folder, `img_${i}`)
          
        );
        const images = [featured, ...numberedImages];

        return (
            <div key={idx} id={`gallery-modal-${idx+1}`} className="modal fixed inset-0 flex items-center justify-center z-50">
                <div className="modal-overlay absolute inset-0"></div>
                <div className="modal-container gallery-modal-content bg-white w-11/12 md:max-w-2xl mx-auto rounded-xl shadow-lg z-50 overflow-y-auto max-h-screen">
                    <div className="modal-content py-4 px-6">
                        <div className="flex justify-between items-center pb-3">
                            <div className="modal-close cursor-pointer z-50 p-2">
                                <i className="fas fa-times text-gray-500 hover:text-gray-700"></i>
                            </div>
                        </div>
                        <div className="px-6 pb-6">
                            <div className="p-6 rounded-lg mb-6" style={{background: "#b47377"}}>
                                <h2 className="dancing-script text-3xl text-center" style={{color: "#ead6c6"}}>{title + " Images"}</h2>
                            </div>
                            
                            <div className="gallery-grid">
                                {images.map((src, i) => (
                                    <div className="gallery-item" key={i}>
                                        <img src={src} alt={`${folder}-img${i}`} loading="lazy" />
                                    </div>
                                ))}
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
      })}
      
      {/* Footer */}
      <footer className="bg-purple-800 text-white py-8 px-4">
          <div className="container mx-auto text-center">
              
              <p className="dancing-script text-2xl mb-4">Made with <i className="fas fa-heart text-pink-400"></i> for you</p>
             
          </div>
      </footer>
    </>
  )
}

export default App
