import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import LanguageIcon from '@mui/icons-material/Language';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import KeyIcon from '@mui/icons-material/Key';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import './LoginSignup.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader';

function LoginSignup() {
  const [theme, setTheme] = useState('light');
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [selectedState, setSelectedState] = useState(null);
  const [bubblePosition, setBubblePosition] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();
  const mapRef = useRef(null);

  const stateInfoDatabase = {
    // States
    'Andhra Pradesh': {
      name: 'Andhra Pradesh',
      cities: ['Visakhapatnam', 'Vijayawada', 'Tirupati'],
      description: 'Visakhapatnam is a major port city with beautiful beaches. Tirupati is home to the famous Sri Venkateswara Temple, one of the richest temples in the world.',
      languages: ['Telugu', 'Urdu']
    },
    'Arunachal Pradesh': {
      name: 'Arunachal Pradesh',
      cities: ['Itanagar', 'Tawang', 'Ziro'],
      description: 'Tawang Monastery is the largest monastery in India. Ziro Valley is famous for the Apatani tribal culture and lush green landscapes.',
      languages: ['English', 'Hindi', 'Nyishi']
    },
    'Assam': {
      name: 'Assam',
      cities: ['Guwahati', 'Dibrugarh', 'Tezpur'],
      description: 'Guwahati is home to the ancient Kamakhya Temple. Assam is known worldwide for its high-quality tea production.',
      languages: ['Assamese', 'Bengali', 'Bodo']
    },
    'Bihar': {
      name: 'Bihar',
      cities: ['Patna', 'Gaya', 'Bhagalpur'],
      description: 'Bodh Gaya is the site where Buddha attained enlightenment. Nalanda University was an ancient center of learning.',
      languages: ['Hindi', 'Bhojpuri', 'Maithili']
    },
    'Chhattisgarh': {
      name: 'Chhattisgarh',
      cities: ['Raipur', 'Bilaspur', 'Durg'],
      description: 'Chhattisgarh is known for its rich tribal culture and natural waterfalls like Chitrakote Falls.',
      languages: ['Chhattisgarhi', 'Hindi']
    },
    'Goa': {
      name: 'Goa',
      cities: ['Panaji', 'Margao', 'Vasco da Gama'],
      description: 'Goa is famous for its pristine beaches, Portuguese heritage, and vibrant nightlife.',
      languages: ['Konkani', 'Marathi', 'Portuguese']
    },
    'Gujarat': {
      name: 'Gujarat',
      cities: ['Ahmedabad', 'Surat', 'Vadodara'],
      description: 'Ahmedabad is India\'s first UNESCO World Heritage City. Surat is known as the "Diamond City" processing 90% of the world\'s diamonds.',
      languages: ['Gujarati', 'Hindi']
    },
    'Haryana': {
      name: 'Haryana',
      cities: ['Chandigarh', 'Gurugram', 'Faridabad'],
      description: 'Gurugram is a leading IT and financial hub. Kurukshetra is believed to be the site of the Mahabharata war.',
      languages: ['Hindi', 'Haryanvi', 'Punjabi']
    },
    'Himachal Pradesh': {
      name: 'Himachal Pradesh',
      cities: ['Shimla', 'Manali', 'Dharamshala'],
      description: 'Shimla is a beautiful hill station and was the summer capital of British India. Dharamshala is the residence of the Dalai Lama.',
      languages: ['Hindi', 'Pahari', 'Punjabi']
    },
    'Jharkhand': {
      name: 'Jharkhand',
      cities: ['Ranchi', 'Jamshedpur', 'Dhanbad'],
      description: 'Jharkhand is rich in mineral resources and has the famous Betla National Park.',
      languages: ['Hindi', 'Santali', 'Bhojpuri']
    },
    'Karnataka': {
      name: 'Karnataka',
      cities: ['Bengaluru', 'Mysuru', 'Mangaluru'],
      description: 'Bengaluru is India\'s "Silicon Valley" with over 12,000 startups. Mysuru\'s Mysore Palace is one of the most visited monuments in India.',
      languages: ['Kannada', 'Tulu', 'Konkani']
    },
    'Kerala': {
      name: 'Kerala',
      cities: ['Kochi', 'Thiruvananthapuram', 'Kozhikode'],
      description: 'Kochi houses the oldest European church in India. Thiruvananthapuram is known for Padmanabhaswamy Temple, one of the richest temples in the world.',
      languages: ['Malayalam', 'Tamil']
    },
    'Madhya Pradesh': {
      name: 'Madhya Pradesh',
      cities: ['Bhopal', 'Indore', 'Gwalior'],
      description: 'Khajuraho is famous for its stunning erotic temples. Bhopal is known as the "City of Lakes".',
      languages: ['Hindi', 'Malwi', 'Bundeli']
    },
    'Maharashtra': {
      name: 'Maharashtra',
      cities: ['Mumbai', 'Pune', 'Nagpur'],
      description: 'Mumbai, the financial capital, is home to Bollywood and historic caves of Elephanta. Pune is known as the "Oxford of the East".',
      languages: ['Marathi', 'Konkani', 'Hindi']
    },
    'Manipur': {
      name: 'Manipur',
      cities: ['Imphal', 'Churachandpur', 'Thoubal'],
      description: 'Manipur is known for Loktak Lake, the largest floating lake in the world.',
      languages: ['Manipuri', 'Hindi', 'English']
    },
    
    // Union Territories
    'Delhi': {
      name: 'Delhi',
      cities: ['New Delhi', 'Old Delhi', 'Dwarka'],
      description: 'The capital of India, Delhi is home to iconic landmarks like India Gate, Red Fort, and Qutub Minar.',
      languages: ['Hindi', 'Punjabi', 'Urdu']
    },
    'Puducherry': {
      name: 'Puducherry',
      cities: ['Puducherry', 'Karaikal', 'Yanam'],
      description: 'Puducherry retains a strong French colonial influence with its charming streets and beaches.',
      languages: ['Tamil', 'French', 'Telugu']
    },
    'Ladakh': {
      name: 'Ladakh',
      cities: ['Leh', 'Kargil', 'Diskit'],
      description: 'Ladakh is known for its breathtaking landscapes, monasteries, and adventure tourism.',
      languages: ['Ladakhi', 'Tibetan', 'Hindi']
    },
    'Jammu and Kashmir': {
      name: 'Jammu and Kashmir',
      cities: ['Srinagar', 'Jammu', 'Gulmarg'],
      description: 'Srinagar is famous for its Dal Lake and houseboats. Gulmarg is a top skiing destination in India.',
      languages: ['Kashmiri', 'Urdu', 'Dogri']
    },
    
    'Meghalaya': {
      name: 'Meghalaya',
      cities: ['Shillong', 'Cherrapunji', 'Tura'],
      description: 'Shillong is known as the "Scotland of the East". Cherrapunji and Mawsynram are among the wettest places on Earth with living root bridges made from tree roots.',
      languages: ['Khasi', 'Garo', 'English']
    },
    'Mizoram': {
      name: 'Mizoram',
      cities: ['Aizawl', 'Lunglei', 'Champhai'],
      description: 'Mizoram is known for its bamboo forests, vibrant tribal culture, and the Dampa Tiger Reserve.',
      languages: ['Mizo', 'English', 'Hindi']
    },
    'Nagaland': {
      name: 'Nagaland',
      cities: ['Kohima', 'Dimapur', 'Mokokchung'],
      description: 'Nagaland is known for the Hornbill Festival, its tribal heritage, and rich biodiversity. Kohima was the site of a pivotal World War II battle.',
      languages: ['English', 'Nagamese', 'Various Naga languages']
    },
    'Odisha': {
      name: 'Odisha',
      cities: ['Bhubaneswar', 'Cuttack', 'Puri'],
      description: 'Bhubaneswar is known as the "Temple City" with over 500 temples. Puri is famous for the Jagannath Temple and its annual Rath Yatra festival.',
      languages: ['Odia', 'Hindi', 'English']
    },
    'Punjab': {
      name: 'Punjab',
      cities: ['Amritsar', 'Ludhiana', 'Jalandhar'],
      description: 'Amritsar is home to the Golden Temple, the holiest shrine in Sikhism. Punjab is known as the "Breadbasket of India" for its agricultural production.',
      languages: ['Punjabi', 'Hindi']
    },
    'Rajasthan': {
      name: 'Rajasthan',
      cities: ['Jaipur', 'Jodhpur', 'Udaipur'],
      description: 'Jaipur, the "Pink City", is known for its stunning palaces and forts. Rajasthan is famous for its colorful culture, desert landscapes, and royal heritage.',
      languages: ['Hindi', 'Rajasthani', 'Marwari']
    },
    'Sikkim': {
      name: 'Sikkim',
      cities: ['Gangtok', 'Namchi', 'Pelling'],
      description: 'Sikkim is home to Kanchenjunga, the third highest mountain in the world. It is known for its pristine landscapes, Buddhist monasteries, and organic farming.',
      languages: ['Nepali', 'Sikkimese', 'Lepcha']
    },
    'Tamil Nadu': {
      name: 'Tamil Nadu',
      cities: ['Chennai', 'Coimbatore', 'Madurai'],
      description: 'Chennai is known as the "Detroit of India" for its auto industry. Tamil Nadu is famous for its Dravidian temple architecture and classical Bharatanatyam dance.',
      languages: ['Tamil', 'English']
    },
    'Telangana': {
      name: 'Telangana',
      cities: ['Hyderabad', 'Warangal', 'Nizamabad'],
      description: 'Hyderabad is a major IT hub and home to the Charminar and Golconda Fort. Telangana is known for its rich history and the Kakatiya dynasty architecture.',
      languages: ['Telugu', 'Urdu', 'Hindi']
    },
    'Tripura': {
      name: 'Tripura',
      cities: ['Agartala', 'Udaipur', 'Dharmanagar'],
      description: 'Tripura is known for its indigenous tribal cultures, bamboo handicrafts, and the Neermahal Palace, a unique water palace.',
      languages: ['Bengali', 'Kokborok', 'English']
    },
    'Uttar Pradesh': {
      name: 'Uttar Pradesh',
      cities: ['Lucknow', 'Varanasi', 'Agra'],
      description: 'Agra is home to the Taj Mahal, one of the Seven Wonders of the World. Varanasi is one of the oldest continuously inhabited cities in the world.',
      languages: ['Hindi', 'Urdu', 'Awadhi']
    },
    'Uttarakhand': {
      name: 'Uttarakhand',
      cities: ['Dehradun', 'Haridwar', 'Nainital'],
      description: 'Uttarakhand is known as the "Land of Gods" with important Hindu pilgrimage sites. It contains the source of the Ganges River and Jim Corbett National Park.',
      languages: ['Hindi', 'Garhwali', 'Kumaoni']
    },
    'West Bengal': {
      name: 'West Bengal',
      cities: ['Kolkata', 'Darjeeling', 'Siliguri'],
      description: 'Kolkata is known as the "Cultural Capital of India". Darjeeling is famous for its tea plantations and views of the Himalayas.',
      languages: ['Bengali', 'Hindi', 'English']
    },
    'Andaman and Nicobar Islands': {
      name: 'Andaman and Nicobar Islands',
      cities: ['Port Blair', 'Havelock Island', 'Neil Island'],
      description: 'This union territory is known for its stunning beaches, coral reefs, and the historic Cellular Jail. It comprises 572 islands in the Bay of Bengal.',
      languages: ['Hindi', 'Bengali', 'Tamil']
    },
    'Chandigarh': {
      name: 'Chandigarh',
      cities: ['Chandigarh'],
      description: 'Chandigarh is a planned city designed by the architect Le Corbusier. It serves as the capital of both Punjab and Haryana states.',
      languages: ['Hindi', 'Punjabi', 'English']
    },
    'Dadra and Nagar Haveli and Daman and Diu': {
      name: 'Dadra and Nagar Haveli and Daman and Diu',
      cities: ['Silvassa', 'Daman', 'Diu'],
      description: 'This union territory is known for its Portuguese colonial architecture, beaches, and tax-free status making it popular for industries.',
      languages: ['Gujarati', 'Hindi', 'Marathi']
    },
    'Lakshadweep': {
      name: 'Lakshadweep',
      cities: ['Kavaratti', 'Agatti', 'Minicoy'],
      description: 'Lakshadweep is an archipelago of 36 islands known for its pristine coral reefs, turquoise lagoons, and marine biodiversity.',
      languages: ['Malayalam', 'Mahl', 'Hindi']
    }
  };
  
// State ID to Name Mapping
const stateIdToNameMap = {
  'IN-AP': 'Andhra Pradesh',
  'IN-AR': 'Arunachal Pradesh',
  'IN-AS': 'Assam',
  'IN-BR': 'Bihar',
  'IN-CT': 'Chhattisgarh',
  'IN-GA': 'Goa',
  'IN-GJ': 'Gujarat',
  'IN-HR': 'Haryana',
  'IN-HP': 'Himachal Pradesh',
  'IN-JH': 'Jharkhand',
  'IN-KA': 'Karnataka',
  'IN-KL': 'Kerala',
  'IN-MP': 'Madhya Pradesh',
  'IN-MH': 'Maharashtra',
  'IN-MN': 'Manipur',
  'IN-ML': 'Meghalaya',
  'IN-MZ': 'Mizoram',
  'IN-NL': 'Nagaland',
  'IN-OR': 'Odisha',
  'IN-PB': 'Punjab',
  'IN-RJ': 'Rajasthan',
  'IN-SK': 'Sikkim',
  'IN-TN': 'Tamil Nadu',
  'IN-TG': 'Telangana',
  'IN-TR': 'Tripura',
  'IN-UP': 'Uttar Pradesh',
  'IN-UT': 'Uttarakhand',
  'IN-WB': 'West Bengal',
  'IN-AN': 'Andaman and Nicobar Islands',
  'IN-CH': 'Chandigarh',
  'IN-DN': 'Dadra and Nagar Haveli and Daman and Diu',
  'IN-DL': 'Delhi',
  'IN-JK': 'Jammu and Kashmir',
  'IN-LA': 'Ladakh',
  'IN-LD': 'Lakshadweep',
  'IN-PY': 'Puducherry'
};
  
  // Update the defaultStateInfo object
  // eslint-disable-next-line
const defaultStateInfo = {
  name: "State Information Unavailable",
  description: 'We don\'t have information about this state yet. Check back later!',
  cities: ['Information not available'],
  languages: ['Information not available']
};

  useEffect(() => {
    // Add animation class after component mounts
    const timer = setTimeout(() => {
      document.querySelector('.auth-form').classList.add('show');
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const initIndiaMap = useCallback(() => {
    // Create scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(theme === 'dark' ? '#1a1a1a' : '#f0f8ff');

    // Create camera
    const camera = new THREE.PerspectiveCamera(
      75,
      mapRef.current.clientWidth / mapRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    // Create renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mapRef.current.clientWidth, mapRef.current.clientHeight);
    
    // Clear any existing canvas
    if (mapRef.current.children.length > 0) {
      mapRef.current.innerHTML = '';
    }
    
    mapRef.current.appendChild(renderer.domElement);

    // Add controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = true;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;

    // Load SVG
    const loader = new SVGLoader();
    loader.load('india-map.svg', (data) => {
      const paths = data.paths;
      const group = new THREE.Group();
      
      // Set the center of the map
      group.position.x = 0;
      group.position.y = 0;
      group.scale.set(0.05, -0.05, 0.05); // Increased scale for better visibility
      
      // Create a group for each path/state
      paths.forEach((path, i) => {
        const material = new THREE.MeshPhongMaterial({
          color: theme === 'dark' ? 0x6e8cbc : 0x4a6fa5,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.9,
          shininess: 100,
          specular: 0x111111
        });
        
        const shapes = path.toShapes(true);
        
        shapes.forEach((shape) => {
          // Create extrusion settings
          const extrudeSettings = {
            depth: 3,
            bevelEnabled: true,
            bevelSegments: 2,
            steps: 2,
            bevelSize: 0.5,
            bevelThickness: 0.5
          };
          
          // Create geometry
          const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
          
          // Create mesh
          const mesh = new THREE.Mesh(geometry, material);
          
          // Store state info for interaction
          mesh.userData = {
            stateIndex: i,
            stateName: path.userData ? path.userData.node.id : `State ${i}`
          };
          
          // Add mesh to group
          group.add(mesh);
        });
      });
      
      // Add group to scene
      scene.add(group);
      
      // Adjust camera position to see the entire map
      camera.position.z = 30;

      // Fit camera to view the entire map
      const box = new THREE.Box3().setFromObject(group);
      const size = box.getSize(new THREE.Vector3());
      const center = box.getCenter(new THREE.Vector3());

      // Center the camera on the map
      group.position.x = -center.x;
      group.position.y = -center.y;

      // Adjust camera distance to fit the entire map
      const maxDim = Math.max(size.x, size.y);
      const fov = camera.fov * (Math.PI / 180);
      const cameraDistance = maxDim / (2 * Math.tan(fov / 2));

      // Set the camera position to properly view the map
      camera.position.z = cameraDistance * 1.2; // Add 20% padding
      
      // Setup raycaster for state selection
      const raycaster = new THREE.Raycaster();
      const mouse = new THREE.Vector2();
      
      // Add click event listener
      renderer.domElement.addEventListener('click', (event) => {
        // Calculate mouse position in normalized device coordinates
        const rect = renderer.domElement.getBoundingClientRect();
        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        
        // Update the picking ray with the camera and mouse position
        raycaster.setFromCamera(mouse, camera);
        
        // Calculate objects intersecting the picking ray
        const intersects = raycaster.intersectObjects(group.children);
        
        if (intersects.length > 0) {
          const selectedMesh = intersects[0].object;
          const stateData = selectedMesh.userData;
          
          // Get state info from database or use default
          // Fix: Properly merge default state info with any found state info
          const stateName = stateIdToNameMap[stateData.stateName] || stateData.stateName;
          const stateInfo = stateInfoDatabase[stateName] || {
            name: stateName, // Keep the actual state name
            cities: ['Not available'],
            description: 'Information about this state is not available yet.',
            languages: ['Information not available']
          };
          
          setSelectedState(stateInfo);
          
          // Calculate position for the chat bubble to appear near the clicked point
          const point = intersects[0].point;
          const vector = new THREE.Vector3(point.x, point.y, point.z);
          vector.project(camera);
          
          const x = (vector.x * 0.5 + 0.5) * renderer.domElement.clientWidth;
          const y = (-(vector.y * 0.5) + 0.5) * renderer.domElement.clientHeight;
          
          // Set bubble position
          setBubblePosition({ x, y });
          
          // Highlight selected state
          group.children.forEach((child) => {
            if (child instanceof THREE.Mesh) {
              child.material.color.set(theme === 'dark' ? 0x6e8cbc : 0x4a6fa5);
            }
          });
          
          selectedMesh.material.color.set(0xff9933); // Highlight with saffron color
        }
      });
    });

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Handle window resize
    const handleResize = () => {
      // Store the current ref in a variable to avoid the warning
      const currentMapRef = mapRef.current;
      if (currentMapRef) {
        camera.aspect = currentMapRef.clientWidth / currentMapRef.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(currentMapRef.clientWidth, currentMapRef.clientHeight);
      }
    };

    window.addEventListener('resize', handleResize);

    // Return cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
      // Stop animation loop
      renderer.setAnimationLoop(null);
      // Dispose of resources
      renderer.dispose();
    };
    // eslint-disable-next-line
  }, [theme]);

  useEffect(() => {
    // Initialize 3D map
    if (mapRef.current) {
      const cleanup = initIndiaMap();
      
      // Clean up function
      return () => {
        // Run the cleanup function returned by initIndiaMap
        if (cleanup) cleanup();
        
        // Store the current ref in a variable to avoid the warning
        // eslint-disable-next-line
        const currentMapRef = mapRef.current;
        
        if (currentMapRef && currentMapRef.children.length > 0) {
          const canvas = currentMapRef.children[0];
          if (canvas) {
            currentMapRef.removeChild(canvas);
          }
        }
      };
    }
  }, [initIndiaMap]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const toggleView = () => {
    // Trigger exit animation
    document.querySelector('.auth-form').classList.remove('show');
    
    setTimeout(() => {
      setIsLogin(!isLogin);
      // Reset form data when switching views
      setFormData({
        name: '',
        email: '',
        password: ''
      });
      
      // Trigger entrance animation
      setTimeout(() => {
        document.querySelector('.auth-form').classList.add('show');
      }, 50);
    }, 300);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      navigate('/app'); // Navigate to the main app
    }, 1500);
  };

  const closeStateBubble = () => {
    setSelectedState(null);
  };

  return (
    <div className="App">
      <div className="app-left-section">
        <div className={`phone-container ${theme}`}>
          <div className="app-header">
            <div className="app-title">
              <LanguageIcon style={{ marginRight: '8px' }} /> 
              Dialect Translator
            </div>
            <div className="theme-toggle" onClick={toggleTheme}>
              {theme === 'dark' ? <LightModeIcon className="icon" /> : <DarkModeIcon className="icon" />}
            </div>
          </div>
          
          <div className="auth-container">
            <div className="auth-form">
              <div className="auth-header">
                <h2>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
                <p>{isLogin ? 'Sign in to continue' : 'Get started with your account'}</p>
              </div>
              
              <form onSubmit={handleSubmit}>
                {!isLogin && (
                  <div className="form-group">
                    <div className="input-icon">
                      <PersonIcon />
                    </div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Full Name"
                      required={!isLogin}
                    />
                  </div>
                )}
                
                <div className="form-group">
                  <div className="input-icon">
                    <EmailIcon />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <div className="input-icon">
                    <KeyIcon />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    required
                  />
                  <div className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </div>
                </div>
                
                {isLogin && (
                  <div className="forgot-password">
                    <a href="#forgot">Forgot Password?</a>
                  </div>
                )}
                
                <button type="submit" className={`submit-button ${loading ? 'loading' : ''}`}>
                  {loading ? (
                    <div className="spinner"></div>
                  ) : (
                    isLogin ? 'Sign In' : 'Sign Up'
                  )}
                </button>
              </form>
              
              <div className="auth-divider">
                <span>Or continue with</span>
              </div>
              
              <div className="social-auth">
                <button className="social-button google">
                  <GoogleIcon />
                </button>
                <button className="social-button facebook">
                  <FacebookIcon />
                </button>
                <button className="social-button twitter">
                  <TwitterIcon />
                </button>
              </div>
              
              <div className="auth-switch">
                <p>
                  {isLogin ? "Don't have an account? " : "Already have an account? "}
                  <a href="#toggle" onClick={(e) => { e.preventDefault(); toggleView(); }}>
                    {isLogin ? 'Sign Up' : 'Sign In'}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="app-right-section">
        <div>
          <h2 className="map-heading">Explore Indian Dialects</h2>
          <p className="map-description">
            Discover the rich diversity of languages and dialects across India. 
            Click on a state to learn about its unique linguistic heritage.
          </p>
          <div className="india-map-container" ref={mapRef}>
            {/* Map renders here */}
            {selectedState && (
              <div 
                className="state-info-bubble" 
                style={{ 
                  left: `${bubblePosition.x}px`, 
                  top: `${bubblePosition.y}px`,
                }}
              >
                <div className="bubble-close" onClick={closeStateBubble}>×</div>
                <h3 className="state-name">{selectedState.name}</h3>
                <div className="state-cities">
                  <span className="info-label">Famous Cities:</span> {selectedState.cities && selectedState.cities.join(', ')}
                </div>
                <div className="state-languages">
                  <span className="info-label">Languages:</span> {selectedState.languages && selectedState.languages.join(', ')}
                </div>
                <p className="state-description">{selectedState.description}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginSignup;