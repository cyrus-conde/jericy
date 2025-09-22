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
                      <div className="month-card bg-white rounded-xl p-6 shadow-lg text-center transform hover:scale-105 transition duration-300 cursor-pointer" data-month="3">
                          <div className="mb-4">
                              <div className="inline-block p-4 bg-pink-100 rounded-full">
                                  <i className="fas fa-heart text-2xl text-pink-500"></i>
                              </div>
                          </div>
                          <h3 className="text-xl font-semibold text-purple-700">4th Month</h3>
                          <p className="text-gray-600">December 23, 2025</p>
                      </div>
                      <div className="month-card bg-white rounded-xl p-6 shadow-lg text-center transform hover:scale-105 transition duration-300 cursor-pointer" data-month="3">
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
                      <div className="month-card bg-white rounded-xl p-6 shadow-lg text-center transform hover:scale-105 transition duration-300 cursor-pointer" data-month="3">
                          <div className="mb-4">
                              <div className="inline-block p-4 bg-pink-100 rounded-full">
                                  <i className="fas fa-heart text-2xl text-pink-500"></i>
                              </div>
                          </div>
                          <h3 className="text-xl font-semibold text-purple-700">7th Month</h3>
                          <p className="text-gray-600">March 23, 2026</p>
                      </div>
                      <div className="month-card bg-white rounded-xl p-6 shadow-lg text-center transform hover:scale-105 transition duration-300 cursor-pointer" data-month="3">
                          <div className="mb-4">
                              <div className="inline-block p-4 bg-pink-100 rounded-full">
                                  <i className="fas fa-heart text-2xl text-pink-500"></i>
                              </div>
                          </div>
                          <h3 className="text-xl font-semibold text-purple-700">8th Month</h3>
                          <p className="text-gray-600">April 23, 2026</p>
                      </div>
                      <div className="month-card bg-white rounded-xl p-6 shadow-lg text-center transform hover:scale-105 transition duration-300 cursor-pointer" data-month="3">
                          <div className="mb-4">
                              <div className="inline-block p-4 bg-pink-100 rounded-full">
                                  <i className="fas fa-heart text-2xl text-pink-500"></i>
                              </div>
                          </div>
                          <h3 className="text-xl font-semibold text-purple-700">9th Month</h3>
                          <p className="text-gray-600">May 23, 2026</p>
                      </div>
                      <div className="month-card bg-white rounded-xl p-6 shadow-lg text-center transform hover:scale-105 transition duration-300 cursor-pointer" data-month="3">
                          <div className="mb-4">
                              <div className="inline-block p-4 bg-pink-100 rounded-full">
                                  <i className="fas fa-heart text-2xl text-pink-500"></i>
                              </div>
                          </div>
                          <h3 className="text-xl font-semibold text-purple-700">10th Month</h3>
                          <p className="text-gray-600">June 23, 2026</p>
                      </div>
                      <div className="month-card bg-white rounded-xl p-6 shadow-lg text-center transform hover:scale-105 transition duration-300 cursor-pointer" data-month="3">
                          <div className="mb-4">
                              <div className="inline-block p-4 bg-pink-100 rounded-full">
                                  <i className="fas fa-heart text-2xl text-pink-500"></i>
                              </div>
                          </div>
                          <h3 className="text-xl font-semibold text-purple-700">11th Month</h3>
                          <p className="text-gray-600">July 23, 2026</p>
                      </div>
                      <div className="month-card bg-white rounded-xl p-6 shadow-lg text-center transform hover:scale-105 transition duration-300 cursor-pointer" data-month="3">
                          <div className="mb-4">
                              <div className="inline-block p-4 bg-pink-100 rounded-full">
                                  <i className="fas fa-heart text-2xl text-pink-500"></i>
                              </div>
                          </div>
                          <h3 className="text-xl font-semibold text-purple-700">12th Month</h3>
                          <p className="text-gray-600">August 23, 2026</p>
                      </div>
                      <div className="month-card bg-white rounded-xl p-6 shadow-lg text-center transform hover:scale-105 transition duration-300 cursor-pointer" data-month="3">
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
          
          {/* About Us Section */}
          <section id="about" className="py-12 px-4 bg-lavender">
              <div className="container mx-auto">
                  <h2 className="dancing-script text-3xl md:text-5xl text-center text-purple-700 mb-8">Our Story</h2>
                  
                  <div className="flex flex-col md:flex-row items-center max-w-5xl mx-auto">
                      <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
                          <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80" alt="Woman with beautiful smile in natural lighting" className="rounded-xl shadow-lg" />
                      </div>
                      <div className="md:w-1/2">
                          <h3 className="text-2xl font-semid-bold text-purple-700 mb-4">How We Met</h3>
                          <p className="text-gray-700 mb-4">It was a sunny afternoon at the local coffee shop when our eyes first met. I was captivated by your smile and the way your eyes lit up when you talked about your passions.</p>
                          <p className="text-gray-700 mb-4">We started with casual conversations that soon turned into deep discussions about life, dreams, and everything in between. I knew there was something special about you from that very first day.</p>
                          
                          <h3 className="text-2xl font-semibold text-purple-700 mt-8 mb-4">Our Journey</h3>
                          <p className="text-gray-700 mb-4">What started as friendship gradually blossomed into something beautiful. Our first date, our first laugh together, our first adventure - each moment has been a treasure.</p>
                          <p className="text-gray-700">I feel incredibly lucky to have you in my life, and I look forward to creating many more beautiful memories together.</p>
                      </div>
                  </div>
              </div>
          </section>
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
                          <p className="text-center text-gray-600">October 15, 2023</p>
                      </div>
                      
                      <div className="letter-content">
                          <p className="dancing-script text-xl text-gray-700 mb-4">My Dearest,</p>
                          <p className="text-gray-700 mb-4">I can't believe it's already been one month since we started this beautiful journey together. Every moment with you feels like a dream come true.</p>
                          <p className="text-gray-700 mb-4">Your smile brightens my day, your laughter is my favorite melody, and your love has transformed my world in ways I never imagined possible.</p>
                          <p className="text-gray-700 mb-4">I remember our first date like it was yesterday - how nervous I was, and how quickly those nerves melted away when I saw your beautiful smile. That day confirmed what I had already felt in my heart - that we had something special.</p>
                          <p className="text-gray-700 mb-4">I look forward to celebrating many more months with you, growing together, and building a future filled with love and happiness.</p>
                          <p className="dancing-script text-xl text-gray-700 mt-8">Forever yours,<br/>Your Love</p>
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
              <div className="flex justify-center space-x-6 mb-6">
                  <a href="#" className="text-white hover:text-pink-200"><i className="fab fa-instagram text-2xl"></i></a>
                  <a href="#" className="text-white hover:text-pink-200"><i className="fab fa-facebook text-2xl"></i></a>
                  <a href="#" className="text-white hover:text-pink-200"><i className="fab fa-twitter text-2xl"></i></a>
              </div>
              <p className="dancing-script text-2xl mb-4">Made with <i className="fas fa-heart text-pink-400"></i> for you</p>
              <p>© 2023 Our Monthsary. All rights reserved.</p>
          </div>
      </footer>
    </>
  )
}

export default App
