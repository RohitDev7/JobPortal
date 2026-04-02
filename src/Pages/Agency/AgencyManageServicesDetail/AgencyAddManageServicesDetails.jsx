import React, { useEffect, useState, useRef } from 'react'
import Sidebar from '../../../components/Sidebar'
import { Col, Container, Row, Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import JoditEditor from 'jodit-react';

export default function AgencyAddManageServicesDetails({ sidebarOpen, setSidebarOpen }) {

  const navigate = useNavigate();
  const editor = useRef(null);

  const [services, setServices] = useState([]);
  const [servicesWithoutDetails, setServicesWithoutDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedService, setSelectedService] = useState(null);
  
  // Get logged-in user info from localStorage or your auth system
  const [loggedInUser, setLoggedInUser] = useState(null);

  const [form, setForm] = useState({
    // Basic
    title: "",
    slug: "",
    agencyId: "",
    agencyName: "",
    serviceId: "",
    serviceType: "",
    vehicleType: "",
    description: "",
    status: "pending",
    logo: "",
    
    // Provider
    providerId: "",
    providerName: "",
    providerWebsite: "",
    providerServiceType: "",
    providerCompanySize: "",
    providerFounded: "",
    providerHeadOffice: "",
    providerAbout: "",
    providerLogo: "",
    
    // Route
    routeFrom: "",
    routeTo: "",
    routeDistance: "",
    routeStops: "",
    routeDuration: "",
    routeHighway: "",
    routeTollCharges: "",
    routeBestTime: "",
    
    // Vehicle
    vehicleModel: "",
    vehicleYear: "",
    vehicleColor: "",
    vehicleRegistration: "",
    vehicleFeatures: "",
    
    // Price
    priceAmount: "",
    priceCurrency: "₹",
    pricePeriod: "",
    discountRoundTrip: "",
    discountWeekly: "",
    discountCorporate: "",
    discountRegularOffers: "",
    extraNightTrip: "",
    extraExtraHour: "",
    extraExtraKm: "",
    
    // Duration
    durationHours: "",
    durationMinutes: "",
    durationFlexible: false,
    durationMaxWaiting: "",
    
    // Features
    amenities: "",
    serviceHighlights: "",
    
    // Driver
    driverName: "",
    driverAge: "",
    driverExperience: "",
    driverLanguages: "",
    driverRating: "",
    driverTotalTrips: "",
    driverBadges: "",
    driverPhone: "",
    driverPhoto: "",
    driverSpecialties: "",
    
    // Policies
    cancellationPolicy: "",
    paymentOptions: "",
    
    // Contact
    contactName: "",
    contactDesignation: "",
    contactEmail: "",
    contactPhone: "",
    contactAvailable: "",
    contactResponseTime: "",
    
    // Booking
    bookingMethod: "",
    bookingExternalUrl: "",
    bookingDeadline: "",
    bookingMinAdvance: "",
    bookingConfirmationTime: "",
    bookingPeakSurcharge: "",
    
    // Stats
    statsViews: "0",
    statsBookings: "0",
    statsCancelled: "0",
    statsAvgRating: "0",
    statsFiveStar: "0",
    statsReviews: "0",
    
    // Extra
    tags: "",
    seasonalOffers: "",
    nearbyAttractions: "",
    
    // Meta
    postedBy: "",
    createdAt: new Date().toISOString().split("T")[0],
    updatedAt: new Date().toISOString().split("T")[0]
  });

  // Get logged-in user data
  useEffect(() => {
    // Get user from localStorage (adjust based on your auth system)
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      setLoggedInUser(user);
      console.log("Logged-in User:", user);
      
      // Auto-set agencyId and providerId from logged-in user
      setForm(prev => ({
        ...prev,
        agencyId: user.agencyId || user.id || "",
        agencyName: user.agencyName || user.name || "",
        providerId: user.providerId || user.id || "",
        providerName: user.providerName || user.name || "",
        postedBy: user.id || ""
      }));
    }
  }, []);

  // Fetch services and filter by logged-in user
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch all services
        const servicesRes = await axios.get(`http://localhost:5002/services`);
        const allServices = servicesRes.data;
        
        // Fetch all service details
        const serviceDetailsRes = await axios.get(`http://localhost:5002/serviceDetails`);
        const allServiceDetails = serviceDetailsRes.data;
        
        // Get IDs that already have details in serviceDetails
        const serviceIdsWithDetails = allServiceDetails.map(detail => detail.id);
        
        console.log("All Services:", allServices);
        console.log("Service IDs with Details:", serviceIdsWithDetails);
        
        // STEP 1: Filter services by logged-in user's agency ID or provider name
        let filteredByUser = [];
        
        if (loggedInUser) {
          // Check if user has agencyId, providerId, or providerName
          const userAgencyId = loggedInUser.agencyId || loggedInUser.id;
          const userProviderName = loggedInUser.providerName || loggedInUser.name;
          
          filteredByUser = allServices.filter(service => {
            // Match by agencyId OR providerId OR providerName
            const matchesAgencyId = service.agencyId === userAgencyId;
            const matchesProviderId = service.providerId === userAgencyId;
            const matchesProviderName = service.providerName?.toLowerCase() === userProviderName?.toLowerCase();
            
            const isMatch = matchesAgencyId || matchesProviderId || matchesProviderName;
            
            if (isMatch) {
              console.log(`✅ Service belongs to user: ${service.title} (${service.id})`);
            }
            
            return isMatch;
          });
          
          console.log("Services belonging to logged-in user:", filteredByUser);
        } else {
          // If no user logged in, show all services (or empty array based on your requirement)
          filteredByUser = allServices;
          console.warn("No logged-in user found - showing all services");
        }
        
        // STEP 2: Further filter to show only those WITHOUT details
        const servicesWithout = filteredByUser.filter(service => {
          const hasDetails = serviceIdsWithDetails.includes(service.id);
          console.log(`Service ${service.id} (${service.title}): Has Details? ${hasDetails}`);
          return !hasDetails;
        });
        
        console.log("Final Services Without Details (for this agency):", servicesWithout);
        setServices(allServices);
        setServicesWithoutDetails(servicesWithout);
        setLoading(false);
      } catch (err) {
        console.log("Error fetching data:", err);
        setLoading(false);
      }
    };
    
    if (loggedInUser) {
      fetchData();
    } else {
      setLoading(false);
    }
  }, [loggedInUser]);

  // Handle service selection and auto-fill form
  const handleServiceSelect = async (e) => {
    const serviceId = e.target.value;
    
    if (!serviceId) {
      setSelectedService(null);
      // Reset form but keep agency details
      setForm({
        ...form,
        title: "",
        slug: "",
        serviceId: "",
        serviceType: "",
        vehicleType: "",
        description: "",
        logo: "",
        routeFrom: "",
        routeTo: "",
        routeDistance: "",
        routeStops: "",
        routeDuration: "",
        routeHighway: "",
        routeTollCharges: "",
        routeBestTime: "",
        priceAmount: "",
        priceCurrency: "₹",
        pricePeriod: "",
        amenities: "",
        serviceHighlights: "",
        tags: "",
        nearbyAttractions: ""
      });
      return;
    }
    
    try {
      // Find the selected service from services array
      const selected = services.find(s => s.id === serviceId);
      if (selected) {
        setSelectedService(selected);
        
        // Auto-fill form with service data
        setForm({
          ...form,
          title: selected.title || "",
          slug: selected.title ? selected.title.toLowerCase().replace(/ /g, "-") : "",
          serviceId: selected.id,
          serviceType: selected.type || "",
          vehicleType: selected.type === "Bus" ? "Luxury Bus" : "Luxury SUV",
          description: selected.description || "",
          logo: selected.logo || "",
          routeFrom: selected.location ? selected.location.split(" to ")[0] : selected.location || "",
          routeTo: selected.location ? selected.location.split(" to ")[1] : "",
          priceAmount: selected.price || "",
          pricePeriod: "one-way",
          amenities: selected.amenities || "",
          // Keep the logged-in user's agency/provider info
          agencyId: form.agencyId, // Use logged-in user's agency ID
          agencyName: form.agencyName, // Use logged-in user's agency name
          providerId: form.providerId, // Use logged-in user's provider ID
          providerName: form.providerName, // Use logged-in user's provider name
          providerLogo: selected.logo || form.providerLogo,
          postedBy: form.postedBy, // Use logged-in user's ID
          providerWebsite: "",
          providerServiceType: selected.type === "Bus" ? "Bus operating industry" : "Cab service",
          providerCompanySize: "",
          providerFounded: "",
          providerHeadOffice: selected.location || "",
          providerAbout: selected.description || "",
        });
      }
    } catch (err) {
      console.log("Error selecting service:", err);
    }
  };

  const addService = async (e) => {
    e.preventDefault();
    try {
      // Use the existing service ID from services array
      const newId = form.serviceId;
      
      if (!newId) {
        alert("Please select a service first!");
        return;
      }
      
      const newData = {
        id: newId,  // Same ID as in services array
        title: form.title,
        slug: form.slug || form.title.toLowerCase().replace(/ /g, "-"),
        agencyId: form.agencyId, // Uses logged-in user's agency ID
        agencyName: form.agencyName, // Uses logged-in user's agency name
        serviceType: form.serviceType,
        vehicleType: form.vehicleType,
        description: form.description,
        status: "pending",
        logo: form.logo || form.providerLogo,
        
        provider: {
          id: form.providerId || newId,
          providerName: form.providerName || form.agencyName,
          logo: form.providerLogo || form.logo,
          website: form.providerWebsite,
          serviceType: form.providerServiceType,
          companySize: form.providerCompanySize,
          founded: form.providerFounded,
          headOffice: form.providerHeadOffice,
          about: form.providerAbout
        },
        
        route: {
          from: form.routeFrom,
          to: form.routeTo,
          distance: form.routeDistance,
          stops: form.routeStops ? form.routeStops.split(",").map(s => s.trim()) : [],
          duration: form.routeDuration,
          highway: form.routeHighway,
          tollCharges: form.routeTollCharges,
          bestTimeToTravel: form.routeBestTime
        },
        
        vehicleDetails: {
          model: form.vehicleModel,
          year: form.vehicleYear,
          color: form.vehicleColor,
          registration: form.vehicleRegistration,
          features: form.vehicleFeatures ? form.vehicleFeatures.split(",").map(f => f.trim()) : []
        },
        
        price: {
          amount: parseFloat(form.priceAmount) || 0,
          currency: form.priceCurrency,
          period: form.pricePeriod,
          discounts: {
            roundTrip: form.discountRoundTrip,
            weekly: form.discountWeekly,
            corporate: form.discountCorporate,
            regularOffers: form.discountRegularOffers
          },
          additionalCharges: {
            nightTrip: form.extraNightTrip,
            extraHour: form.extraExtraHour,
            extraKm: form.extraExtraKm
          }
        },
        
        duration: {
          hours: parseInt(form.durationHours) || 0,
          minutes: parseInt(form.durationMinutes) || 0,
          flexible: form.durationFlexible,
          maxWaitingTime: form.durationMaxWaiting
        },
        
        amenities: form.amenities ? form.amenities.split(",").map(a => a.trim()) : [],
        serviceHighlights: form.serviceHighlights ? form.serviceHighlights.split(",").map(h => h.trim()) : [],
        
        driverDetails: {
          name: form.driverName,
          age: form.driverAge,
          experience: form.driverExperience,
          languages: form.driverLanguages ? form.driverLanguages.split(",").map(l => l.trim()) : [],
          rating: parseFloat(form.driverRating) || 0,
          totalTrips: parseInt(form.driverTotalTrips) || 0,
          badges: form.driverBadges ? form.driverBadges.split(",").map(b => b.trim()) : [],
          phone: form.driverPhone,
          photo: form.driverPhoto,
          specialties: form.driverSpecialties ? form.driverSpecialties.split(",").map(s => s.trim()) : []
        },
        
        cancellationPolicy: form.cancellationPolicy,
        paymentOptions: form.paymentOptions ? form.paymentOptions.split(",").map(p => p.trim()) : [],
        
        contactPerson: {
          name: form.contactName,
          designation: form.contactDesignation,
          email: form.contactEmail,
          phone: form.contactPhone,
          available: form.contactAvailable,
          responseTime: form.contactResponseTime
        },
        
        bookingInfo: {
          method: form.bookingMethod,
          externalUrl: form.bookingExternalUrl || null,
          deadline: form.bookingDeadline,
          minAdvance: form.bookingMinAdvance,
          confirmationTime: form.bookingConfirmationTime,
          peakSeasonSurcharge: form.bookingPeakSurcharge
        },
        
        stats: {
          views: parseInt(form.statsViews) || 0,
          bookings: parseInt(form.statsBookings) || 0,
          cancelled: parseInt(form.statsCancelled) || 0,
          avgRating: parseFloat(form.statsAvgRating) || 0,
          fiveStarRatings: parseInt(form.statsFiveStar) || 0,
          reviews: parseInt(form.statsReviews) || 0
        },
        
        reviews: [],
        
        tags: form.tags ? form.tags.split(",").map(t => t.trim()) : [],
        seasonalOffers: form.seasonalOffers,
        nearbyAttractions: form.nearbyAttractions ? form.nearbyAttractions.split(",").map(a => a.trim()) : [],
        
        postedBy: form.postedBy,
        createdAt: form.createdAt,
        updatedAt: new Date().toISOString().split("T")[0]
      };

      await axios.post(`http://localhost:5002/serviceDetails`, newData);
      alert("Service details added successfully!");
      navigate("/manage-services");
    }
    catch (err) {
      console.log("Error adding service", err);
      alert("Error adding service details. Please try again.");
    }
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const config = {
    readonly: false,
    placeholder: 'Start typing...',
    height: 300,
    buttons: ['bold', 'italic', 'underline', 'strikethrough', 'ul', 'ol', 'link', 'image', 'video', 'table', 'font', 'fontsize', 'brush', 'paragraph', 'align', 'undo', 'redo', 'eraser']
  };

  return (
    <>
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <div className={sidebarOpen ? "dashboard-container sidebar-open" : "dashboard-container"}>
        <Container fluid>
          <Row>
            <Col lg={12}>
              <h2 className="dashboard-title mb-4">Add New Service Details</h2>
            </Col>

            <Col lg={12}>
              <div className="chart-card p-4">
                <form onSubmit={addService}>
                  <Row className="g-4">
                    
                    {/* Select Existing Service */}
                    <Col xs={12}>
                      <h4 className="section-title mb-3 pb-2 border-bottom">Select Service to Add Details</h4>
                    </Col>
                    
                    <Col md={12}>
                      <Form.Label className="fw-bold">Select Service *</Form.Label>
                      <Form.Select 
                        onChange={handleServiceSelect}
                        value={form.serviceId}
                        required
                      >
                        <option value="">-- Select a service to add details --</option>
                        {servicesWithoutDetails.map(service => (
                          <option key={service.id} value={service.id}>
                            {service.title} ({service.type}) - {service.location} (ID: {service.id}) - Provider: {service.providerName}
                          </option>
                        ))}
                      </Form.Select>
                      
                      {/* Show logged-in user info */}
                      {loggedInUser && (
                        <Form.Text className="text-info d-block mt-2">
                          🔐 Logged in as: {loggedInUser.name || loggedInUser.providerName} 
                          (Agency ID: {loggedInUser.agencyId || loggedInUser.id})
                        </Form.Text>
                      )}
                      
                      {loading ? (
                        <Form.Text className="text-muted">Loading services...</Form.Text>
                      ) : servicesWithoutDetails.length === 0 ? (
                        <Form.Text className="text-success">
                          ✅ No services found for your agency that need details. All your services already have detailed pages!
                        </Form.Text>
                      ) : (
                        <Form.Text className="text-success">
                          📋 Found {servicesWithoutDetails.length} service(s) for your agency that need details. Select one to continue.
                        </Form.Text>
                      )}
                    </Col>

                    {selectedService && (
                      <>
                        <Col xs={12} className="mt-3">
                          <div className="alert alert-success">
                            <strong>✅ Selected Service:</strong> {selectedService.title} <br/>
                            <strong>🆔 Service ID:</strong> {selectedService.id} <br/>
                            <strong>📌 Type:</strong> {selectedService.type} <br/>
                            <strong>📍 Location:</strong> {selectedService.location} <br/>
                            <strong>💰 Price:</strong> ₹{selectedService.price} <br/>
                            <strong>🏢 Provider ID:</strong> {selectedService.providerId} <br/>
                            <strong>🏢 Provider Name:</strong> {selectedService.providerName}
                          </div>
                        </Col>
                      </>
                    )}

                    {/* Basic Information */}
                    <Col xs={12} className="mt-4">
                      <h4 className="section-title mb-3 pb-2 border-bottom">Basic Information</h4>
                    </Col>
                    
                    <Col md={6}>
                      <Form.Label className="fw-bold">Agency ID *</Form.Label>
                      <Form.Control 
                        name="agencyId" 
                        value={form.agencyId} 
                        readOnly
                        disabled
                        style={{ backgroundColor: '#e9ecef' }}
                      />
                      <Form.Text className="text-muted">Auto-filled from your login (cannot be changed)</Form.Text>
                    </Col>
                    
                    <Col md={6}>
                      <Form.Label className="fw-bold">Agency Name *</Form.Label>
                      <Form.Control 
                        name="agencyName" 
                        value={form.agencyName} 
                        readOnly
                        disabled
                        style={{ backgroundColor: '#e9ecef' }}
                      />
                      <Form.Text className="text-muted">Auto-filled from your login (cannot be changed)</Form.Text>
                    </Col>
                    
                    <Col md={6}>
                      <Form.Label className="fw-bold">Service ID *</Form.Label>
                      <Form.Control 
                        name="serviceId" 
                        value={form.serviceId} 
                        readOnly
                        disabled
                        style={{ backgroundColor: '#e9ecef', fontWeight: 'bold' }}
                      />
                      <Form.Text className="text-muted">Using existing service ID from services list</Form.Text>
                    </Col>
                    
                    <Col md={6}>
                      <Form.Label className="fw-bold">Title *</Form.Label>
                      <Form.Control name="title" value={form.title} onChange={handleChange} required />
                    </Col>
                    
                    <Col md={6}>
                      <Form.Label className="fw-bold">Slug</Form.Label>
                      <Form.Control name="slug" value={form.slug} onChange={handleChange} placeholder="auto-generated from title" />
                    </Col>
                    
                    <Col md={6}>
                      <Form.Label className="fw-bold">Service Type *</Form.Label>
                      <Form.Select name="serviceType" value={form.serviceType} onChange={handleChange} required>
                        <option value="">Select Service Type</option>
                        <option value="Cab">Cab</option>
                        <option value="Bus">Bus</option>
                        <option value="Flight">Flight</option>
                        <option value="Hotel">Hotel</option>
                      </Form.Select>
                    </Col>
                    
                    <Col md={6}>
                      <Form.Label className="fw-bold">Vehicle Type</Form.Label>
                      <Form.Control name="vehicleType" value={form.vehicleType} onChange={handleChange} />
                    </Col>
                    
                    <Col md={12}>
                      <Form.Label className="fw-bold">Logo URL</Form.Label>
                      <Form.Control name="logo" value={form.logo} onChange={handleChange} />
                    </Col>
                    
                    <Col md={12}>
                      <Form.Label className="fw-bold">Description *</Form.Label>
                      <JoditEditor
                        ref={editor}
                        value={form.description}
                        config={config}
                        onBlur={newContent => setForm({ ...form, description: newContent })}
                        onChange={newContent => {}}
                      />
                    </Col>

                    {/* Provider Information */}
                    <Col xs={12} className="mt-4">
                      <h4 className="section-title mb-3 pb-2 border-bottom">Provider Information</h4>
                    </Col>
                    
                    <Col md={6}>
                      <Form.Label className="fw-bold">Provider ID</Form.Label>
                      <Form.Control 
                        name="providerId" 
                        value={form.providerId} 
                        onChange={handleChange}
                        readOnly
                        disabled
                        style={{ backgroundColor: '#e9ecef' }}
                      />
                      <Form.Text className="text-muted">Auto-filled from your login</Form.Text>
                    </Col>
                    
                    <Col md={6}>
                      <Form.Label className="fw-bold">Provider Name</Form.Label>
                      <Form.Control 
                        name="providerName" 
                        value={form.providerName} 
                        onChange={handleChange}
                        readOnly
                        disabled
                        style={{ backgroundColor: '#e9ecef' }}
                      />
                      <Form.Text className="text-muted">Auto-filled from your login</Form.Text>
                    </Col>
                    
                    <Col md={6}>
                      <Form.Label className="fw-bold">Provider Logo URL</Form.Label>
                      <Form.Control name="providerLogo" value={form.providerLogo} onChange={handleChange} />
                    </Col>
                    
                    <Col md={6}>
                      <Form.Label className="fw-bold">Website</Form.Label>
                      <Form.Control name="providerWebsite" value={form.providerWebsite} onChange={handleChange} />
                    </Col>
                    
                    <Col md={6}>
                      <Form.Label className="fw-bold">Service Type</Form.Label>
                      <Form.Control name="providerServiceType" value={form.providerServiceType} onChange={handleChange} />
                    </Col>
                    
                    <Col md={6}>
                      <Form.Label className="fw-bold">Company Size</Form.Label>
                      <Form.Control name="providerCompanySize" value={form.providerCompanySize} onChange={handleChange} />
                    </Col>
                    
                    <Col md={6}>
                      <Form.Label className="fw-bold">Founded</Form.Label>
                      <Form.Control name="providerFounded" value={form.providerFounded} onChange={handleChange} />
                    </Col>
                    
                    <Col md={6}>
                      <Form.Label className="fw-bold">Head Office</Form.Label>
                      <Form.Control name="providerHeadOffice" value={form.providerHeadOffice} onChange={handleChange} />
                    </Col>
                    
                    <Col md={12}>
                      <Form.Label className="fw-bold">About</Form.Label>
                      <JoditEditor
                        ref={editor}
                        value={form.providerAbout}
                        config={config}
                        onBlur={newContent => setForm({ ...form, providerAbout: newContent })}
                        onChange={newContent => {}}
                      />
                    </Col>

                    {/* Rest of your form fields remain the same */}
                    {/* ... (keep all other sections from route details to submit button exactly as they were) ... */}

                    {/* Submit Button */}
                    <Col xs={12} className="mt-4 text-center">
                      <Button 
                        type="submit" 
                        className="signup-btn px-5 py-2" 
                        disabled={!form.serviceId}
                        style={{ opacity: !form.serviceId ? 0.6 : 1 }}
                      >
                        Add Service Details
                      </Button>
                    </Col>
                  </Row>
                </form>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  )
}