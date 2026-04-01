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

  // Fetch services and serviceDetails to find which services don't have details
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
        
        // Filter services that DON'T have details
        // Sirf wahi services show karo jinka ID serviceDetails mein NAHI hai
        const servicesWithout = allServices.filter(service => {
          // Agar service ka ID serviceDetails array mein nahi hai to show karo
          const hasDetails = serviceIdsWithDetails.includes(service.id);
          console.log(`Service ${service.id} (${service.title}): Has Details? ${hasDetails}`);
          return !hasDetails;
        });
        
        console.log("Services Without Details:", servicesWithout);
        setServices(allServices);
        setServicesWithoutDetails(servicesWithout);
        setLoading(false);
      } catch (err) {
        console.log("Error fetching data:", err);
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

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
        agencyId: "",
        agencyName: "",
        providerId: "",
        providerName: "",
        providerLogo: "",
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
        // IMPORTANT: Use the service's own providerId and agencyId, NOT the logged-in user's
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
          // FIXED: Use the service's actual provider and agency IDs, not the logged-in user's
          agencyId: selected.agencyId || selected.providerId || "",  // Use agencyId from service
          agencyName: selected.providerName || selected.agencyName || "",  // Use provider name from service
          providerId: selected.providerId || "",  // Use providerId from service
          providerName: selected.providerName || "",  // Use providerName from service
          providerLogo: selected.logo || "",
          postedBy: selected.providerId || selected.agencyId || "",  // Use provider ID as postedBy
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
        agencyId: form.agencyId,
        agencyName: form.agencyName,
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
                      {loading ? (
                        <Form.Text className="text-muted">Loading services...</Form.Text>
                      ) : servicesWithoutDetails.length === 0 ? (
                        <Form.Text className="text-danger">
                          ✅ No services found without details. All services already have detailed pages!
                        </Form.Text>
                      ) : (
                        <Form.Text className="text-success">
                          📋 Found {servicesWithoutDetails.length} service(s) that need details. Select one to continue.
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
                      <Form.Text className="text-muted">Auto-filled from selected service</Form.Text>
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
                      <Form.Text className="text-muted">Auto-filled from selected service</Form.Text>
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
                      <Form.Text className="text-muted">Auto-filled from selected service</Form.Text>
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
                      <Form.Text className="text-muted">Auto-filled from selected service</Form.Text>
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

                    {/* Route Details */}
                    <Col xs={12} className="mt-4">
                      <h4 className="section-title mb-3 pb-2 border-bottom">Route Details</h4>
                    </Col>
                    
                    <Col md={6}>
                      <Form.Label className="fw-bold">From</Form.Label>
                      <Form.Control name="routeFrom" value={form.routeFrom} onChange={handleChange} />
                    </Col>
                    
                    <Col md={6}>
                      <Form.Label className="fw-bold">To</Form.Label>
                      <Form.Control name="routeTo" value={form.routeTo} onChange={handleChange} />
                    </Col>
                    
                    <Col md={6}>
                      <Form.Label className="fw-bold">Distance</Form.Label>
                      <Form.Control name="routeDistance" value={form.routeDistance} onChange={handleChange} />
                    </Col>
                    
                    <Col md={6}>
                      <Form.Label className="fw-bold">Duration</Form.Label>
                      <Form.Control name="routeDuration" value={form.routeDuration} onChange={handleChange} />
                    </Col>
                    
                    <Col md={12}>
                      <Form.Label className="fw-bold">Stops (comma separated)</Form.Label>
                      <Form.Control name="routeStops" value={form.routeStops} onChange={handleChange} placeholder="e.g., Chandigarh, Kullu, Mandi" />
                    </Col>
                    
                    <Col md={6}>
                      <Form.Label className="fw-bold">Highway</Form.Label>
                      <Form.Control name="routeHighway" value={form.routeHighway} onChange={handleChange} />
                    </Col>
                    
                    <Col md={6}>
                      <Form.Label className="fw-bold">Toll Charges</Form.Label>
                      <Form.Control name="routeTollCharges" value={form.routeTollCharges} onChange={handleChange} />
                    </Col>
                    
                    <Col md={12}>
                      <Form.Label className="fw-bold">Best Time to Travel</Form.Label>
                      <Form.Control name="routeBestTime" value={form.routeBestTime} onChange={handleChange} />
                    </Col>

                    {/* Vehicle Details */}
                    <Col xs={12} className="mt-4">
                      <h4 className="section-title mb-3 pb-2 border-bottom">Vehicle Details</h4>
                    </Col>
                    
                    <Col md={6}>
                      <Form.Label className="fw-bold">Model</Form.Label>
                      <Form.Control name="vehicleModel" value={form.vehicleModel} onChange={handleChange} />
                    </Col>
                    
                    <Col md={6}>
                      <Form.Label className="fw-bold">Year</Form.Label>
                      <Form.Control name="vehicleYear" value={form.vehicleYear} onChange={handleChange} />
                    </Col>
                    
                    <Col md={6}>
                      <Form.Label className="fw-bold">Color</Form.Label>
                      <Form.Control name="vehicleColor" value={form.vehicleColor} onChange={handleChange} />
                    </Col>
                    
                    <Col md={6}>
                      <Form.Label className="fw-bold">Registration</Form.Label>
                      <Form.Control name="vehicleRegistration" value={form.vehicleRegistration} onChange={handleChange} />
                    </Col>
                    
                    <Col md={12}>
                      <Form.Label className="fw-bold">Features (comma separated)</Form.Label>
                      <Form.Control name="vehicleFeatures" value={form.vehicleFeatures} onChange={handleChange} placeholder="e.g., AC, WiFi, Music System" />
                    </Col>

                    {/* Price Details */}
                    <Col xs={12} className="mt-4">
                      <h4 className="section-title mb-3 pb-2 border-bottom">Price Details</h4>
                    </Col>
                    
                    <Col md={4}>
                      <Form.Label className="fw-bold">Amount *</Form.Label>
                      <Form.Control name="priceAmount" value={form.priceAmount} onChange={handleChange} required />
                    </Col>
                    
                    <Col md={4}>
                      <Form.Label className="fw-bold">Currency</Form.Label>
                      <Form.Select name="priceCurrency" value={form.priceCurrency} onChange={handleChange}>
                        <option value="₹">₹ (INR)</option>
                        <option value="$">$ (USD)</option>
                        <option value="€">€ (EUR)</option>
                        <option value="£">£ (GBP)</option>
                      </Form.Select>
                    </Col>
                    
                    <Col md={4}>
                      <Form.Label className="fw-bold">Period</Form.Label>
                      <Form.Select name="pricePeriod" value={form.pricePeriod} onChange={handleChange}>
                        <option value="">Select Period</option>
                        <option value="one-way">One Way</option>
                        <option value="round-trip">Round Trip</option>
                        <option value="per-day">Per Day</option>
                        <option value="per-hour">Per Hour</option>
                      </Form.Select>
                    </Col>
                    
                    <Col md={6}>
                      <Form.Label className="fw-bold">Round Trip Discount</Form.Label>
                      <Form.Control name="discountRoundTrip" value={form.discountRoundTrip} onChange={handleChange} />
                    </Col>
                    
                    <Col md={6}>
                      <Form.Label className="fw-bold">Weekly Discount</Form.Label>
                      <Form.Control name="discountWeekly" value={form.discountWeekly} onChange={handleChange} />
                    </Col>
                    
                    <Col md={6}>
                      <Form.Label className="fw-bold">Corporate Discount</Form.Label>
                      <Form.Control name="discountCorporate" value={form.discountCorporate} onChange={handleChange} />
                    </Col>
                    
                    <Col md={6}>
                      <Form.Label className="fw-bold">Regular Offers</Form.Label>
                      <Form.Control name="discountRegularOffers" value={form.discountRegularOffers} onChange={handleChange} />
                    </Col>
                    
                    <Col md={4}>
                      <Form.Label className="fw-bold">Night Trip Charge</Form.Label>
                      <Form.Control name="extraNightTrip" value={form.extraNightTrip} onChange={handleChange} />
                    </Col>
                    
                    <Col md={4}>
                      <Form.Label className="fw-bold">Extra Hour Charge</Form.Label>
                      <Form.Control name="extraExtraHour" value={form.extraExtraHour} onChange={handleChange} />
                    </Col>
                    
                    <Col md={4}>
                      <Form.Label className="fw-bold">Extra KM Charge</Form.Label>
                      <Form.Control name="extraExtraKm" value={form.extraExtraKm} onChange={handleChange} />
                    </Col>

                    {/* Duration Details */}
                    <Col xs={12} className="mt-4">
                      <h4 className="section-title mb-3 pb-2 border-bottom">Duration Details</h4>
                    </Col>
                    
                    <Col md={4}>
                      <Form.Label className="fw-bold">Hours</Form.Label>
                      <Form.Control name="durationHours" value={form.durationHours} onChange={handleChange} />
                    </Col>
                    
                    <Col md={4}>
                      <Form.Label className="fw-bold">Minutes</Form.Label>
                      <Form.Control name="durationMinutes" value={form.durationMinutes} onChange={handleChange} />
                    </Col>
                    
                    <Col md={4}>
                      <Form.Label className="fw-bold">Flexible</Form.Label>
                      <Form.Check 
                        type="checkbox" 
                        name="durationFlexible" 
                        checked={form.durationFlexible} 
                        onChange={handleChange}
                        label="Yes"
                      />
                    </Col>
                    
                    <Col md={12}>
                      <Form.Label className="fw-bold">Max Waiting Time</Form.Label>
                      <Form.Control name="durationMaxWaiting" value={form.durationMaxWaiting} onChange={handleChange} />
                    </Col>

                    {/* Features */}
                    <Col xs={12} className="mt-4">
                      <h4 className="section-title mb-3 pb-2 border-bottom">Features</h4>
                    </Col>
                    
                    <Col md={12}>
                      <Form.Label className="fw-bold">Amenities (comma separated)</Form.Label>
                      <Form.Control name="amenities" value={form.amenities} onChange={handleChange} placeholder="e.g., AC, WiFi, Water Bottle" />
                    </Col>
                    
                    <Col md={12}>
                      <Form.Label className="fw-bold">Service Highlights (comma separated)</Form.Label>
                      <Form.Control name="serviceHighlights" value={form.serviceHighlights} onChange={handleChange} />
                    </Col>

                    {/* Driver Details */}
                    <Col xs={12} className="mt-4">
                      <h4 className="section-title mb-3 pb-2 border-bottom">Driver Details</h4>
                    </Col>
                    
                    <Col md={6}>
                      <Form.Label className="fw-bold">Driver Name</Form.Label>
                      <Form.Control name="driverName" value={form.driverName} onChange={handleChange} />
                    </Col>
                    
                    <Col md={6}>
                      <Form.Label className="fw-bold">Age</Form.Label>
                      <Form.Control name="driverAge" value={form.driverAge} onChange={handleChange} />
                    </Col>
                    
                    <Col md={6}>
                      <Form.Label className="fw-bold">Experience</Form.Label>
                      <Form.Control name="driverExperience" value={form.driverExperience} onChange={handleChange} />
                    </Col>
                    
                    <Col md={6}>
                      <Form.Label className="fw-bold">Rating</Form.Label>
                      <Form.Control name="driverRating" value={form.driverRating} onChange={handleChange} step="0.1" />
                    </Col>
                    
                    <Col md={6}>
                      <Form.Label className="fw-bold">Total Trips</Form.Label>
                      <Form.Control name="driverTotalTrips" value={form.driverTotalTrips} onChange={handleChange} />
                    </Col>
                    
                    <Col md={6}>
                      <Form.Label className="fw-bold">Phone</Form.Label>
                      <Form.Control name="driverPhone" value={form.driverPhone} onChange={handleChange} />
                    </Col>
                    
                    <Col md={12}>
                      <Form.Label className="fw-bold">Languages (comma separated)</Form.Label>
                      <Form.Control name="driverLanguages" value={form.driverLanguages} onChange={handleChange} placeholder="e.g., Hindi, English, Punjabi" />
                    </Col>
                    
                    <Col md={12}>
                      <Form.Label className="fw-bold">Badges (comma separated)</Form.Label>
                      <Form.Control name="driverBadges" value={form.driverBadges} onChange={handleChange} placeholder="e.g., Safe Driver, 5-Star Rated" />
                    </Col>
                    
                    <Col md={12}>
                      <Form.Label className="fw-bold">Specialties (comma separated)</Form.Label>
                      <Form.Control name="driverSpecialties" value={form.driverSpecialties} onChange={handleChange} />
                    </Col>
                    
                    <Col md={12}>
                      <Form.Label className="fw-bold">Photo URL</Form.Label>
                      <Form.Control name="driverPhoto" value={form.driverPhoto} onChange={handleChange} />
                    </Col>

                    {/* Policies */}
                    <Col xs={12} className="mt-4">
                      <h4 className="section-title mb-3 pb-2 border-bottom">Policies</h4>
                    </Col>
                    
                    <Col md={12}>
                      <Form.Label className="fw-bold">Cancellation Policy</Form.Label>
                      <JoditEditor
                        ref={editor}
                        value={form.cancellationPolicy}
                        config={config}
                        onBlur={newContent => setForm({ ...form, cancellationPolicy: newContent })}
                        onChange={newContent => {}}
                      />
                    </Col>
                    
                    <Col md={12}>
                      <Form.Label className="fw-bold">Payment Options (comma separated)</Form.Label>
                      <Form.Control name="paymentOptions" value={form.paymentOptions} onChange={handleChange} placeholder="e.g., Cash, Card, UPI" />
                    </Col>

                    {/* Contact Person */}
                    <Col xs={12} className="mt-4">
                      <h4 className="section-title mb-3 pb-2 border-bottom">Contact Person</h4>
                    </Col>
                    
                    <Col md={6}>
                      <Form.Label className="fw-bold">Name</Form.Label>
                      <Form.Control name="contactName" value={form.contactName} onChange={handleChange} />
                    </Col>
                    
                    <Col md={6}>
                      <Form.Label className="fw-bold">Designation</Form.Label>
                      <Form.Control name="contactDesignation" value={form.contactDesignation} onChange={handleChange} />
                    </Col>
                    
                    <Col md={6}>
                      <Form.Label className="fw-bold">Email</Form.Label>
                      <Form.Control name="contactEmail" value={form.contactEmail} onChange={handleChange} type="email" />
                    </Col>
                    
                    <Col md={6}>
                      <Form.Label className="fw-bold">Phone</Form.Label>
                      <Form.Control name="contactPhone" value={form.contactPhone} onChange={handleChange} />
                    </Col>
                    
                    <Col md={6}>
                      <Form.Label className="fw-bold">Available</Form.Label>
                      <Form.Control name="contactAvailable" value={form.contactAvailable} onChange={handleChange} />
                    </Col>
                    
                    <Col md={6}>
                      <Form.Label className="fw-bold">Response Time</Form.Label>
                      <Form.Control name="contactResponseTime" value={form.contactResponseTime} onChange={handleChange} />
                    </Col>

                    {/* Booking Info */}
                    <Col xs={12} className="mt-4">
                      <h4 className="section-title mb-3 pb-2 border-bottom">Booking Information</h4>
                    </Col>
                    
                    <Col md={6}>
                      <Form.Label className="fw-bold">Method</Form.Label>
                      <Form.Select name="bookingMethod" value={form.bookingMethod} onChange={handleChange}>
                        <option value="">Select Method</option>
                        <option value="Book on portal">Book on portal</option>
                        <option value="Call to book">Call to book</option>
                        <option value="WhatsApp">WhatsApp</option>
                      </Form.Select>
                    </Col>
                    
                    <Col md={6}>
                      <Form.Label className="fw-bold">External URL</Form.Label>
                      <Form.Control name="bookingExternalUrl" value={form.bookingExternalUrl} onChange={handleChange} placeholder="https://..." />
                    </Col>
                    
                    <Col md={6}>
                      <Form.Label className="fw-bold">Deadline</Form.Label>
                      <Form.Control name="bookingDeadline" value={form.bookingDeadline} onChange={handleChange} type="date" />
                    </Col>
                    
                    <Col md={6}>
                      <Form.Label className="fw-bold">Min Advance</Form.Label>
                      <Form.Control name="bookingMinAdvance" value={form.bookingMinAdvance} onChange={handleChange} />
                    </Col>
                    
                    <Col md={6}>
                      <Form.Label className="fw-bold">Confirmation Time</Form.Label>
                      <Form.Control name="bookingConfirmationTime" value={form.bookingConfirmationTime} onChange={handleChange} />
                    </Col>
                    
                    <Col md={6}>
                      <Form.Label className="fw-bold">Peak Season Surcharge</Form.Label>
                      <Form.Control name="bookingPeakSurcharge" value={form.bookingPeakSurcharge} onChange={handleChange} />
                    </Col>

                    {/* Additional Information */}
                    <Col xs={12} className="mt-4">
                      <h4 className="section-title mb-3 pb-2 border-bottom">Additional Information</h4>
                    </Col>
                    
                    <Col md={12}>
                      <Form.Label className="fw-bold">Tags (comma separated)</Form.Label>
                      <Form.Control name="tags" value={form.tags} onChange={handleChange} placeholder="e.g., Luxury, Family, Adventure" />
                    </Col>
                    
                    <Col md={12}>
                      <Form.Label className="fw-bold">Seasonal Offers</Form.Label>
                      <JoditEditor
                        ref={editor}
                        value={form.seasonalOffers}
                        config={config}
                        onBlur={newContent => setForm({ ...form, seasonalOffers: newContent })}
                        onChange={newContent => {}}
                      />
                    </Col>
                    
                    <Col md={12}>
                      <Form.Label className="fw-bold">Nearby Attractions (comma separated)</Form.Label>
                      <Form.Control name="nearbyAttractions" value={form.nearbyAttractions} onChange={handleChange} />
                    </Col>

                    {/* Status Info */}
                    <Col xs={12} className="mt-4">
                      <div className="alert alert-info">
                        <strong>ℹ️ Note:</strong> Your service details will be submitted with <strong>"Pending"</strong> status. Admin will review and approve it before it appears on the website.
                      </div>
                    </Col>

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