'use client';

import React, { useState, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  X,
  Calendar,
  Briefcase,
  GraduationCap,
  MapPinned,
  Camera,
  Award,
  Star,
  Cake,
  Music,
  Trophy,
  Sparkles,
  Users,
  Home,
  MessageCircle,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

// ──────────────────────────────────────────────
// Types / Interfaces
// ──────────────────────────────────────────────

interface FamilyMember {
  id: number;
  name: string;
  role: string;
  image: string;
  message: string;
  fullName: string;
  age: number;
  birthday: string;
  occupation: string;
  education: string;
  location: string;
  bio: string;
  hobbies: string[];
  favoriteQuote: string;
  funFact: string;
  gallery: string[];
}

interface TimelineItem {
  year: string;
  event: string;
  description: string;
  icon: LucideIcon;
}

interface Achievement {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
}

interface Testimonial {
  name: string;
  relationship: string;
  message: string;
  image: string;
}

interface MemoryItem {
  url: string;
  caption: string;
}

// ──────────────────────────────────────────────
// Component
// ──────────────────────────────────────────────

export default function FamilyWebsite() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedMember, setSelectedMember] = useState<FamilyMember | null>(null);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [counters, setCounters] = useState({
    familyMembers: 0,
    memories: 0,
    adventures: 0,
    laughter: 0,
  });
  const [hasAnimated, setHasAnimated] = useState(false);

  const carouselImages = [
    {
      url: 'fampic/daghan.jpg',
      caption: 'Making memories together',
    },
    {
      url: 'fampic/daghan2.jpg',
      caption: 'Family is everything',
    },
    {
      url: 'https://images.unsplash.com/photo-1542037104857-ffbb0b9155fb?w=1200&h=600&fit=crop',
      caption: 'Adventures and laughter',
    },
  ] as const;

  const familyMembers: FamilyMember[] = [
    {
      id: 1,
      name: 'Edgardo',
      role: 'Dad',
      image: 'fampic/father.jpg',
      message: 'The foundation of our family, always there with wisdom and love.',
      fullName: 'Edgardo G. Paceño',
      age: 65,
      birthday: 'January 9, 1961',
      occupation: 'Personal Security',
      education: 'High Grad',
      location: 'Nasipit Agusan del Norte',
      bio: 'A proud former serviceman who now works in political security, bringing the same vigilance and dedication from military life into his current role. Above all, he values honor, responsibility, and providing strength and stability for his family.',
      hobbies: ['Singing', 'Karate', 'Reading', 'Driving'],
      favoriteQuote: 'Rangers never die, they just fade away.',
      funFact: 'Known for having a naturally strong and commanding voice.',
      gallery: ['fampic/father.jpg'],
    },
    {
      id: 2,
      name: 'Winona',
      role: 'Mom',
      image: 'fampic/mada.jpg',
      message: 'The heart of our home, filling our lives with warmth and care.',
      fullName: 'Winona M. Paceño',
      age: 57,
      birthday: 'August 20, 1969',
      occupation: 'House Wife',
      education: 'High Grad',
      location: 'Nasipit Agusan del Norte',
      bio: 'A creative soul who transforms houses into homes and moments into memories. She has an incredible eye for design and an even bigger heart for family. Her warmth and care make every day special.',
      hobbies: ['Singing', 'Dancing', 'Cooking', 'Baking'],
      favoriteQuote: 'Home is where love resides, memories are created, and laughter never ends.',
      funFact: 'Has a collection of over 50 plants in our home!',
      gallery: ['fampic/mada.jpg'],
    },
    {
      id: 3,
      name: 'Wencil',
      role: 'Daughter',
      image: 'https://images.unsplash.com/photo-1542396601-dca920ea2807?w=400&h=400&fit=crop',
      message: 'Our little artist, bringing creativity and joy to every day.',
      fullName: 'Sofia Grace Palma',
      age: 8,
      birthday: 'December 5, 2016',
      occupation: 'Student & Young Artist',
      education: "Grade 3, St. Mary's Academy",
      location: 'Quezon City, Philippines',
      bio: 'A bundle of creativity and imagination! Sofia loves painting, drawing, and creating art from anything she finds. Her cheerful personality and artistic talent brighten every room she enters.',
      hobbies: ['Painting', 'Drawing', 'Dancing', 'Playing Piano'],
      favoriteQuote: 'Every child is an artist!',
      funFact: 'Won first place in the school art competition!',
      gallery: [
        'https://images.unsplash.com/photo-1542396601-dca920ea2807?w=600&h=600&fit=crop',
        'https://images.unsplash.com/photo-1518459031867-a89b944bffe4?w=600&h=600&fit=crop',
        'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600&h=600&fit=crop',
      ],
    },
    {
      id: 4,
      name: 'Lordjems',
      role: 'Son',
      image: 'fampic/lord.jpg',
      message: 'A passionate baker with a lively spirit and a heart that keeps the family smiling.',
      fullName: 'Lordjems M. Paceño',
      age: 37,
      birthday: 'March 18, 1989',
      occupation: 'Baker',
      education: 'High School Graduate',
      location: 'Nasipit, Agusan del Norte',
      bio: 'A hardworking and energetic individual with a deep passion for baking. Known for his creativity in the kitchen and his vibrant personality, he brings warmth and flavor not only through his bread and pastries but also through his presence. His love for music, laughter, and family keeps life exciting and meaningful.',
      hobbies: ['Baking', 'Playing Guitar', 'Dancing', 'Video Games', 'Singing'],
      favoriteQuote: 'Paldo!',
      funFact: 'Has a natural talent for creating delicious homemade bread and pastries.',
      gallery: ['fampic/lord.jpg'],
    },
    {
      id: 5,
      name: 'Dward',
      role: 'Son',
      image: 'fampic/bebe.jpg',
      message: 'A hardworking and multi-skilled professional who takes pride in every job he does.',
      fullName: 'Dward M. Paceño',
      age: 35,
      birthday: 'February 20, 1991',
      occupation: 'Construction Worker, Baker, Customer Service Crew, Professional Driver',
      education: 'High School Graduate',
      location: 'Nasipit, Agusan del Norte',
      bio: 'A dedicated and versatile worker with experience in construction, baking, customer service, and professional driving. Known for his strong work ethic and reliability, he adapts quickly to different roles and always gives his best effort. His determination and resilience make him someone the family can always depend on.',
      hobbies: ['Driving', 'Music', 'Cooking', 'Video Games'],
      favoriteQuote: 'Aray mo, pakak!',
      funFact: 'Has hands-on skills in multiple trades and learns new tasks quickly.',
      gallery: ['fampic/bebe.jpg'],
    },
    {
      id: 6,
      name: 'Nikko',
      role: 'Son',
      image: 'fampic/me.jpg',
      message: 'A tech-driven problem solver who enjoys building meaningful digital experiences.',
      fullName: 'Nikko M. Paceño',
      age: 28,
      birthday: 'December 31, 1997',
      occupation: 'IT Professional / Web Developer',
      education: 'College Graduate',
      location: 'Nasipit, Agusan del Norte',
      bio: 'A passionate IT professional with a strong interest in technology, development, and continuous learning. He enjoys creating digital solutions, exploring modern tools, and improving his craft every day. Outside of work, he values family, creativity, and personal growth.',
      hobbies: ['Coding', 'Music', 'Singing', 'Dancing', 'Hiking'],
      favoriteQuote: 'Stay consistent. Stay hungry.',
      funFact: 'Inherited a naturally great singing voice from his father.',
      gallery: ['fampic/me.jpg'],
    },
    {
      id: 7,
      name: 'Mak2x',
      role: 'Son',
      image: 'fampic/m123.jpg',
      message: 'A tech-driven problem solver who enjoys building meaningful digital experiences.',
      fullName: 'Nikko M. Paceño',
      age: 28,
      birthday: 'December 31, 1997',
      occupation: 'IT Professional / Web Developer',
      education: 'College Graduate',
      location: 'Nasipit, Agusan del Norte',
      bio: 'A passionate IT professional with a strong interest in technology, development, and continuous learning. He enjoys creating digital solutions, exploring modern tools, and improving his craft every day. Outside of work, he values family, creativity, and personal growth.',
      hobbies: ['Coding', 'Music', 'Singing', 'Dancing', 'Hiking'],
      favoriteQuote: 'Stay consistent. Stay hungry.',
      funFact: 'Inherited a naturally great singing voice from his father.',
      gallery: ['fampic/m123.jpg'],
    },
    {
      id: 8,
      name: 'Jan2x',
      role: 'Son',
      image: 'fampic/jan2x.jpg',
      message: 'A dedicated criminology student with a strong sense of justice and curiosity.',
      fullName: 'John Lou M. Paceño',
      age: 23,
      birthday: 'May 11, 2003',
      occupation: 'Criminology Student',
      education: 'College Student (Criminology)',
      location: 'Nasipit, Agusan del Norte',
      bio: 'A focused and motivated criminology student with a passion for learning about law, justice, and community safety. He enjoys staying active, exploring new challenges, and developing skills that will prepare him for a career in criminal justice.',
      hobbies: ['Boxing', 'Singing', 'Dancing', 'Hiking'],
      favoriteQuote: 'Justice is the foundation of a strong society.',
      funFact: 'Has a surprisingly melodic singing voice, just like his father.',
      gallery: ['fampic/jan2x.jpg'],
    },
    {
      id: 9,
      name: 'Clyde',
      role: 'Son',
      image: 'fampic/clyde.jpg',
      message: 'A curious and energetic senior high student, always eager to learn and stay active.',
      fullName: 'Clyde M. Paceño',
      age: 17,
      birthday: 'January 8, 2009',
      occupation: 'Student',
      education: 'Senior High School',
      location: 'Nasipit, Agusan del Norte',
      bio: 'A lively and motivated senior high school student with a love for sports, music, and staying active. He enjoys exploring new hobbies, learning new skills, and spending quality time with family and friends.',
      hobbies: ['Basketball', 'Singing', 'Dancing', 'Gym'],
      favoriteQuote: 'Stay active, stay curious.',
      funFact: 'Has a surprisingly melodic singing voice, just like his father.',
      gallery: ['fampic/clyde.jpg'],
    },
  ];

  const familyTimeline: TimelineItem[] = [
    {
      year: '2014',
      event: 'Nikko & Maria Got Married',
      description: 'Our beautiful journey began',
      icon: Heart,
    },
    {
      year: '2016',
      event: 'Sofia Was Born',
      description: 'Our family grew with joy',
      icon: Cake,
    },
    {
      year: '2018',
      event: 'Lucas Joined Us',
      description: 'Complete happiness achieved',
      icon: Star,
    },
    {
      year: '2020',
      event: 'Moved to Quezon City',
      description: 'Found our forever home',
      icon: Home,
    },
    {
      year: '2026',
      event: 'First Family Website',
      description: 'Sharing our story with the world',
      icon: Sparkles,
    },
  ];

  const achievements: Achievement[] = [
    {
      title: 'Family of the Year 2023',
      description: 'Community Award',
      icon: Trophy,
      color: 'from-yellow-400 to-orange-500',
    },
    {
      title: "Sofia's Art Excellence",
      description: 'School Competition Winner',
      icon: Award,
      color: 'from-purple-400 to-pink-500',
    },
    {
      title: "Lucas's Soccer MVP",
      description: 'Youth League Champion',
      icon: Star,
      color: 'from-blue-400 to-cyan-500',
    },
    {
      title: '10 Years Together',
      description: 'Marriage Anniversary',
      icon: Heart,
      color: 'from-red-400 to-rose-500',
    },
  ];

  const testimonials: Testimonial[] = [
    {
      name: 'Mother Winona',
      relationship: "Nikko's Mother",
      message: 'Watching this family grow has been the greatest joy of my life. They are a true blessing!',
      image: 'fampic/mada.jpg',
    },
    {
      name: 'Edgardo',
      relationship: 'Father',
      message: 'The love in this family is contagious. Every gathering is filled with laughter and warmth.',
      image: 'fampic/father.jpg',
    },
    {
      name: 'Lordjems',
      relationship: 'Brother',
      message: 'Nik naakay extra dha pahulma rako ilisan ra ugma.',
      image: 'fampic/lord.jpg',
    },
    {
      name: 'Mother Winona',
      relationship: "Nikko's Mother",
      message: 'paghigugmaay mo mga anak kay panahon sa kalisod way lain magtinabangay kundi magsoon ra!',
      image: 'fampic/mada.jpg',
    },
  ];

  const memoryWall: MemoryItem[] = [
    { url: 'fampic/mada.jpg', caption: 'Beach Day 2023' },
    
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      if (window.scrollY > 500 && !hasAnimated) {
        animateCounters();
        setHasAnimated(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasAnimated]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [carouselImages.length]);

  useEffect(() => {
    if (selectedMember?.gallery && selectedMember.gallery.length > 1) {
      const timer = setInterval(() => {
        setCurrentPhotoIndex((prev) => (prev + 1) % selectedMember.gallery.length);
      }, 4000);

      return () => clearInterval(timer);
    }
  }, [selectedMember]);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [testimonials.length]);

  const animateCounters = () => {
    const targets = { familyMembers: 9, memories: 1000, adventures: 250, laughter: 9999 };
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      setCounters({
        familyMembers: Math.floor(targets.familyMembers * progress),
        memories: Math.floor(targets.memories * progress),
        adventures: Math.floor(targets.adventures * progress),
        laughter: Math.floor(targets.laughter * progress),
      });

      if (currentStep >= steps) {
        clearInterval(interval);
        setCounters(targets);
      }
    }, stepDuration);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openMemberDetail = (member: FamilyMember) => {
    setSelectedMember(member);
    setCurrentPhotoIndex(0);
    document.body.style.overflow = 'hidden';
  };

  const closeMemberDetail = () => {
    setSelectedMember(null);
    setCurrentPhotoIndex(0);
    document.body.style.overflow = 'unset';
  };

  const nextPhoto = () => {
    if (selectedMember?.gallery) {
      setCurrentPhotoIndex((prev) => (prev + 1) % selectedMember.gallery.length);
    }
  };

  const prevPhoto = () => {
    if (selectedMember?.gallery) {
      setCurrentPhotoIndex((prev) => (prev - 1 + selectedMember.gallery.length) % selectedMember.gallery.length);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50">
      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white/80 backdrop-blur-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-pink-500 to-purple-600 p-2 rounded-xl shadow-lg">
                <Heart className="w-8 h-8 text-white" fill="white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                Paceño Family
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              {['about-us', 'meet-family', 'timeline', 'memories', 'contacts'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className="text-gray-700 hover:text-purple-600 font-medium transition-colors duration-200 capitalize"
                >
                  {section.replace('-', ' ')}
                </button>
              ))}
            </div>

            {/* Mobile Hamburger */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-700 hover:text-purple-600 focus:outline-none"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-7 h-7" />
                ) : (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu - smooth version */}
          <div
            className={`md:hidden overflow-hidden transition-all duration-400 ease-in-out ${
              mobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div
              className={`bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-xl transform transition-all duration-300 ease-out ${
                mobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
              }`}
            >
              <div className="px-5 py-6 flex flex-col space-y-6">
                {['about-us', 'meet-family', 'timeline', 'memories', 'contacts'].map((section) => (
                  <button
                    key={section}
                    onClick={() => {
                      scrollToSection(section);
                      setMobileMenuOpen(false);
                    }}
                    className="text-lg font-medium text-gray-800 hover:text-purple-600 transition-colors duration-200 capitalize text-left py-2 hover:bg-purple-50 rounded-lg"
                  >
                    {section.replace('-', ' ')}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* About Us Section */}
      <section id="about-us" className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Hello, I'm Nikko!
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Welcome to our family's corner of the internet. Here, we share our journey, our love, and the beautiful moments that make our family special. Meet the wonderful people who fill my life with joy every single day.
            </p>
          </div>

          {/* Carousel */}
          <div className="relative max-w-5xl mx-auto mb-20 rounded-3xl overflow-hidden shadow-2xl">
            <div className="relative h-96 md:h-[500px]">
              {carouselImages.map((image, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-700 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
                >
                  <img src={image.url} alt={image.caption} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <p className="text-white text-2xl md:text-3xl font-semibold text-center">{image.caption}</p>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
            >
              <ChevronLeft className="w-6 h-6 text-gray-800" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
            >
              <ChevronRight className="w-6 h-6 text-gray-800" />
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
              {carouselImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-white w-8' : 'bg-white/50'}`}
                />
              ))}
            </div>
          </div>

          {/* Fun Stats Counter */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            <div className="bg-white rounded-2xl p-6 text-center shadow-lg transform hover:scale-105 transition-all">
              <Users className="w-10 h-10 mx-auto mb-3 text-pink-500" />
              <div className="text-4xl font-bold text-gray-800 mb-2">{counters.familyMembers}</div>
              <div className="text-sm text-gray-600">Family Members</div>
            </div>
            <div className="bg-white rounded-2xl p-6 text-center shadow-lg transform hover:scale-105 transition-all">
              <Camera className="w-10 h-10 mx-auto mb-3 text-purple-500" />
              <div className="text-4xl font-bold text-gray-800 mb-2">{counters.memories}+</div>
              <div className="text-sm text-gray-600">Memories Made</div>
            </div>
            <div className="bg-white rounded-2xl p-6 text-center shadow-lg transform hover:scale-105 transition-all">
              <Star className="w-10 h-10 mx-auto mb-3 text-orange-500" />
              <div className="text-4xl font-bold text-gray-800 mb-2">{counters.adventures}+</div>
              <div className="text-sm text-gray-600">Adventures</div>
            </div>
            <div className="bg-white rounded-2xl p-6 text-center shadow-lg transform hover:scale-105 transition-all">
              <Sparkles className="w-10 h-10 mx-auto mb-3 text-yellow-500" />
              <div className="text-4xl font-bold text-gray-800 mb-2">{counters.laughter}+</div>
              <div className="text-sm text-gray-600">Moments of Laughter</div>
            </div>
          </div>
        </div>
      </section>

      {/* Meet My Family Section */}
      <section id="meet-family" className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            Meet My Family
          </h2>
          <p className="text-center text-gray-600 mb-16 text-lg">
            The amazing people who make every day an adventure. Click to learn more about each member!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {familyMembers.map((member, index) => (
              <div
                key={index}
                onClick={() => openMemberDetail(member)}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
              >
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white text-sm font-medium">Click to learn more →</p>
                  </div>
                </div>
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold text-gray-800 mb-1">{member.name}</h3>
                    <p className="text-purple-600 font-medium text-sm uppercase tracking-wider">{member.role}</p>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{member.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Family Timeline Section */}
      <section id="timeline" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            Our Journey Together
          </h2>
          <p className="text-center text-gray-600 mb-16 text-lg">Every milestone tells a story</p>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-pink-500 to-purple-500 hidden md:block" />

            {familyTimeline.map((item, index) => (
              <div key={index} className={`mb-12 flex items-center w-full ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                <div className="w-full md:w-5/12" />
                <div className="relative flex items-center justify-center w-full md:w-2/12">
                  <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg z-10">
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                  <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    <div className="text-2xl font-bold text-pink-600 mb-2">{item.year}</div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{item.event}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Family Achievements */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            Family Achievements
          </h2>
          <p className="text-center text-gray-600 mb-16 text-lg">Celebrating our milestones together</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${achievement.color} rounded-full flex items-center justify-center mb-4 mx-auto`}
                >
                  <achievement.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">{achievement.title}</h3>
                <p className="text-gray-600 text-center">{achievement.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Memory Wall */}
      <section id="memories" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            Memory Wall
          </h2>
          <p className="text-center text-gray-600 mb-16 text-lg">Captured moments that warm our hearts</p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {memoryWall.map((memory, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
              >
                <img src={memory.url} alt={memory.caption} className="w-full h-64 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-white font-semibold text-center">{memory.caption}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            What Others Say
          </h2>
          <p className="text-center text-gray-600 mb-16 text-lg">Love and appreciation from those close to us</p>

          <div className="relative">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`transition-opacity duration-500 ${index === activeTestimonial ? 'opacity-100' : 'opacity-0 absolute inset-0'}`}
              >
                <div className="bg-white rounded-3xl p-12 shadow-2xl">
                  <MessageCircle className="w-12 h-12 text-pink-500 mb-6 mx-auto" />
                  <p className="text-xl text-gray-700 italic text-center mb-8 leading-relaxed">"{testimonial.message}"</p>
                  <div className="flex items-center justify-center gap-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover border-4 border-pink-200"
                    />
                    <div className="text-left">
                      <div className="font-bold text-gray-800">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">{testimonial.relationship}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeTestimonial ? 'bg-pink-500 w-8' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Family Member Detail Modal */}
      {selectedMember && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="min-h-screen flex items-center justify-center p-4 py-8">
            <div className="bg-white rounded-3xl max-w-4xl w-full shadow-2xl relative animate-fade-in-scale">
              <button
                onClick={closeMemberDetail}
                className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
              >
                <X className="w-6 h-6 text-gray-800" />
              </button>

              <div className="relative h-[500px] rounded-t-3xl overflow-hidden">
                {selectedMember.gallery.map((photo, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-700 ${
                      index === currentPhotoIndex ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <img src={photo} alt={`${selectedMember.name} ${index + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                {selectedMember.gallery.length > 1 && (
                  <>
                    <button
                      onClick={prevPhoto}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
                    >
                      <ChevronLeft className="w-5 h-5 text-gray-800" />
                    </button>
                    <button
                      onClick={nextPhoto}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
                    >
                      <ChevronRight className="w-5 h-5 text-gray-800" />
                    </button>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/30 backdrop-blur-sm px-3 py-2 rounded-full">
                      <Camera className="w-4 h-4 text-white" />
                      <span className="text-white text-sm">
                        {currentPhotoIndex + 1} / {selectedMember.gallery.length}
                      </span>
                    </div>
                  </>
                )}

                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">{selectedMember.fullName}</h2>
                  <p className="text-xl text-pink-300 font-medium">{selectedMember.role}</p>
                </div>
              </div>

              <div className="p-8 md:p-12">
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="flex items-start gap-3">
                    <div className="bg-gradient-to-br from-pink-500 to-purple-600 p-2 rounded-lg">
                      <Calendar className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium">Birthday</p>
                      <p className="text-gray-800 font-semibold">{selectedMember.birthday}</p>
                      <p className="text-sm text-gray-600">{selectedMember.age} years old</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="bg-gradient-to-br from-pink-500 to-purple-600 p-2 rounded-lg">
                      <Briefcase className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium">Occupation</p>
                      <p className="text-gray-800 font-semibold">{selectedMember.occupation}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="bg-gradient-to-br from-pink-500 to-purple-600 p-2 rounded-lg">
                      <GraduationCap className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium">Education</p>
                      <p className="text-gray-800 font-semibold">{selectedMember.education}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="bg-gradient-to-br from-pink-500 to-purple-600 p-2 rounded-lg">
                      <MapPinned className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium">Location</p>
                      <p className="text-gray-800 font-semibold">{selectedMember.location}</p>
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">About {selectedMember.name}</h3>
                  <p className="text-gray-700 leading-relaxed text-lg">{selectedMember.bio}</p>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Hobbies & Interests</h3>
                  <div className="flex flex-wrap gap-3">
                    {selectedMember.hobbies.map((hobby, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-gradient-to-r from-pink-100 to-purple-100 text-purple-700 rounded-full font-medium text-sm"
                      >
                        {hobby}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-8 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-6 border-l-4 border-yellow-500">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-5 h-5 text-yellow-600" />
                    <p className="text-sm text-gray-500 font-medium">Fun Fact</p>
                  </div>
                  <p className="text-gray-800 font-medium">{selectedMember.funFact}</p>
                </div>

                <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-6 border-l-4 border-purple-500">
                  <p className="text-sm text-gray-500 font-medium mb-2">Favorite Quote</p>
                  <p className="text-gray-800 italic text-lg font-medium">"{selectedMember.favoriteQuote}"</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contacts Section */}
      <section id="contacts" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            Get In Touch
          </h2>
          <p className="text-center text-gray-600 mb-12 text-lg">We'd love to hear from you! Feel free to reach out.</p>

          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="flex items-start space-x-4">
                <div className="bg-gradient-to-br from-pink-500 to-purple-600 p-3 rounded-xl">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Email</h3>
                  <p className="text-gray-600">nikko.family@email.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-gradient-to-br from-pink-500 to-purple-600 p-3 rounded-xl">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Phone</h3>
                  <p className="text-gray-600">+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-gradient-to-br from-pink-500 to-purple-600 p-3 rounded-xl">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Location</h3>
                  <p className="text-gray-600">Quezon City, Philippines</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-gradient-to-br from-pink-500 to-purple-600 p-3 rounded-xl">
                  <Heart className="w-6 h-6 text-white" fill="white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Follow Us</h3>
                  <div className="flex space-x-3 mt-2">
                    <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors">
                      <Facebook className="w-5 h-5" />
                    </a>
                    <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors">
                      <Instagram className="w-5 h-5" />
                    </a>
                    <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors">
                      <Twitter className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-6 md:mb-0">
              <div className="bg-gradient-to-br from-pink-500 to-purple-600 p-2 rounded-xl">
                <Heart className="w-6 h-6 text-white" fill="white" />
              </div>
              <span className="text-xl font-bold">Paceño Family</span>
            </div>

            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8 mb-6 md:mb-0">
              <button onClick={() => scrollToSection('about-us')} className="hover:text-pink-400 transition-colors">
                About Us
              </button>
              <button onClick={() => scrollToSection('meet-family')} className="hover:text-pink-400 transition-colors">
                Meet My Family
              </button>
              <button onClick={() => scrollToSection('timeline')} className="hover:text-pink-400 transition-colors">
                Timeline
              </button>
              <button onClick={() => scrollToSection('memories')} className="hover:text-pink-400 transition-colors">
                Memories
              </button>
              <button onClick={() => scrollToSection('contacts')} className="hover:text-pink-400 transition-colors">
                Contacts
              </button>
            </div>

            <div className="flex space-x-4">
              <a href="#" className="hover:text-pink-400 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-pink-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-pink-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 Paceño Family. Made with <Heart className="w-4 h-4 inline text-pink-500" fill="currentColor" /> for our loved ones.
            </p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fade-in-scale {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fade-in-scale {
          animation: fade-in-scale 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}