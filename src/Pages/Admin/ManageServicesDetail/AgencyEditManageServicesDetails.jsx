import React, { useEffect, useState, useRef } from 'react'
import Sidebar from '../../../components/Sidebar'
import { Col, Container, Row, Button, Form } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import JoditEditor from 'jodit-react';

export default function AgencyEditManageServicesDetails({ sidebarOpen, setSidebarOpen }) {

  const { id } = useParams();
  const navigate = useNavigate();
  const editor = useRef(null);

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
    status: "",
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
    bookingDeadline: "",
    bookingMinAdvance: "",
    bookingConfirmationTime: "",
    bookingPeakSurcharge: "",
    
    // Stats
    statsViews: "",
    statsBookings: "",
    statsCancelled: "",
    statsAvgRating: "",
    statsFiveStar: "",
    statsReviews: "",
    
    // Extra
    tags: "",
    seasonalOffers: "",
    nearbyAttractions: "",
    
    // Meta
    postedBy: "",
    createdAt: "",
    updatedAt: ""
  });

  useEffect(() => {
    axios.get(`http://localhost:5002/serviceDetails/${id}`)
      .then(res => {
        const data = res.data;
        setForm({
          // Basic
          title: data.title || "",
          slug: data.slug || "",
          agencyId: data.agencyId || "",
          agencyName: data.agencyName || "",
          serviceId: data.id || "",
          serviceType: data.serviceType || "",
          vehicleType: data.vehicleType || "",
          description: data.description || "",
          status: data.status || "",
          logo: data.logo || data.provider?.logo || "",
          
          // Provider
          providerId: data.provider?.id || "",
          providerName: data.provider?.providerName || "",
          providerWebsite: data.provider?.website || "",
          providerServiceType: data.provider?.serviceType || "",
          providerCompanySize: data.provider?.companySize || "",
          providerFounded: data.provider?.founded || "",
          providerHeadOffice: data.provider?.headOffice || "",
          providerAbout: data.provider?.about || "",
          
          // Route
          routeFrom: data.route?.from || "",
          routeTo: data.route?.to || "",
          routeDistance: data.route?.distance || "",
          routeStops: data.route?.stops?.join(", ") || "",
          routeDuration: data.route?.duration || "",
          routeHighway: data.route?.highway || "",
          routeTollCharges: data.route?.tollCharges || "",
          routeBestTime: data.route?.bestTimeToTravel || "",
          
          // Vehicle
          vehicleModel: data.vehicleDetails?.model || "",
          vehicleYear: data.vehicleDetails?.year || "",
          vehicleColor: data.vehicleDetails?.color || "",
          vehicleRegistration: data.vehicleDetails?.registration || "",
          vehicleFeatures: data.vehicleDetails?.features?.join(", ") || "",
          
          // Price
          priceAmount: data.price?.amount || "",
          priceCurrency: data.price?.currency || "₹",
          pricePeriod: data.price?.period || "",
          discountRoundTrip: data.price?.discounts?.roundTrip || "",
          discountWeekly: data.price?.discounts?.weekly || "",
          discountCorporate: data.price?.discounts?.corporate || "",
          discountRegularOffers: data.price?.discounts?.regularOffers || "",
          extraNightTrip: data.price?.additionalCharges?.nightTrip || "",
          extraExtraHour: data.price?.additionalCharges?.extraHour || "",
          extraExtraKm: data.price?.additionalCharges?.extraKm || "",
          
          // Duration
          durationHours: data.duration?.hours || "",
          durationMinutes: data.duration?.minutes || "",
          durationFlexible: data.duration?.flexible || false,
          durationMaxWaiting: data.duration?.maxWaitingTime || "",
          
          // Features
          amenities: data.amenities?.join(", ") || "",
          serviceHighlights: data.serviceHighlights?.join(", ") || "",
          
          // Driver
          driverName: data.driverDetails?.name || "",
          driverAge: data.driverDetails?.age || "",
          driverExperience: data.driverDetails?.experience || "",
          driverLanguages: data.driverDetails?.languages?.join(", ") || "",
          driverRating: data.driverDetails?.rating || "",
          driverTotalTrips: data.driverDetails?.totalTrips || "",
          driverBadges: data.driverDetails?.badges?.join(", ") || "",
          driverPhone: data.driverDetails?.phone || "",
          driverPhoto: data.driverDetails?.photo || "",
          driverSpecialties: data.driverDetails?.specialties?.join(", ") || "",
          
          // Policies
          cancellationPolicy: data.cancellationPolicy || "",
          paymentOptions: data.paymentOptions?.join(", ") || "",
          
          // Contact
          contactName: data.contactPerson?.name || "",
          contactDesignation: data.contactPerson?.designation || "",
          contactEmail: data.contactPerson?.email || "",
          contactPhone: data.contactPerson?.phone || "",
          contactAvailable: data.contactPerson?.available || "",
          contactResponseTime: data.contactPerson?.responseTime || "",
          
          // Booking
          bookingMethod: data.bookingInfo?.method || "",
          bookingDeadline: data.bookingInfo?.deadline || "",
          bookingMinAdvance: data.bookingInfo?.minAdvance || "",
          bookingConfirmationTime: data.bookingInfo?.confirmationTime || "",
          bookingPeakSurcharge: data.bookingInfo?.peakSeasonSurcharge || "",
          
          // Stats
          statsViews: data.stats?.views || "",
          statsBookings: data.stats?.bookings || "",
          statsCancelled: data.stats?.cancelled || "",
          statsAvgRating: data.stats?.avgRating || "",
          statsFiveStar: data.stats?.fiveStarRatings || "",
          statsReviews: data.stats?.reviews || "",
          
          // Extra
          tags: data.tags?.join(", ") || "",
          seasonalOffers: data.seasonalOffers || "",
          nearbyAttractions: data.nearbyAttractions?.join(", ") || "",
          
          // Meta
          postedBy: data.postedBy || "",
          createdAt: data.createdAt || "",
          updatedAt: data.updatedAt || ""
        });
      })
      .catch(err => {
        console.log("error fetching service details", err)
      })
  }, [id])

  const updateService = async (e) => {
    e.preventDefault();
    try {
      const updatedData = {
        id: id,
        title: form.title,
        slug: form.slug,
        agencyId: form.agencyId,
        agencyName: form.agencyName,
        serviceType: form.serviceType,
        vehicleType: form.vehicleType,
        description: form.description,
        status: form.status,
        logo: form.logo,
        
        provider: {
          id: form.providerId,
          providerName: form.providerName,
          website: form.providerWebsite,
          serviceType: form.providerServiceType,
          companySize: form.providerCompanySize,
          founded: form.providerFounded,
          headOffice: form.providerHeadOffice,
          about: form.providerAbout,
          logo: form.logo
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
          amount: form.priceAmount,
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
          hours: form.durationHours,
          minutes: form.durationMinutes,
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
          rating: form.driverRating,
          totalTrips: form.driverTotalTrips,
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
          externalUrl: null,
          deadline: form.bookingDeadline,
          minAdvance: form.bookingMinAdvance,
          confirmationTime: form.bookingConfirmationTime,
          peakSeasonSurcharge: form.bookingPeakSurcharge
        },
        
        stats: {
          views: form.statsViews,
          bookings: form.statsBookings,
          cancelled: form.statsCancelled,
          avgRating: form.statsAvgRating,
          fiveStarRatings: form.statsFiveStar,
          reviews: form.statsReviews
        },
        
        tags: form.tags ? form.tags.split(",").map(t => t.trim()) : [],
        seasonalOffers: form.seasonalOffers,
        nearbyAttractions: form.nearbyAttractions ? form.nearbyAttractions.split(",").map(a => a.trim()) : [],
        
        postedBy: form.postedBy,
        createdAt: form.createdAt,
        updatedAt: new Date().toISOString().split("T")[0]
      };

      await axios.put(`http://localhost:5002/serviceDetails/${id}`, updatedData);
      navigate("/manage-services");
    }
    catch (err) {
      console.log("Error updating", err)
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
              <h2 className="dashboard-title mb-4">Edit Service Details</h2>
            </Col>

            <Col lg={12}>
              <div className="chart-card p-4">
                <form onSubmit={updateService}>
                  <Row className="g-4">
                    {/* Basic Information */}
                    <Col xs={12}>
                      <h4 className="section-title mb-3 pb-2 border-bottom">Basic Information</h4>
                    </Col>
                    
                    <Col md={6}>
                      <Form.Label className="fw-bold">Service ID</Form.Label>
                      <Form.Control 
                        name="serviceId" 
                        value={form.serviceId} 
                        disabled 
                        className="bg-light"
                      />
                      <Form.Text className="text-muted">Service ID cannot be edited</Form.Text>
                    </Col>
                    
                    <Col md={6}>
                      <Form.Label className="fw-bold">Agency ID</Form.Label>
                      <Form.Control 
                        name="agencyId" 
                        value={form.agencyId} 
                        disabled 
                        className="bg-light"
                      />
                      <Form.Text className="text-muted">Agency ID cannot be edited</Form.Text>
                    </Col>
                    
                    <Col md={6}>
                      <Form.Label className="fw-bold">Agency Name</Form.Label>
                      <Form.Control 
                        name="agencyName" 
                        value={form.agencyName} 
                        disabled 
                        className="bg-light"
                      />
                      <Form.Text className="text-muted">Agency Name cannot be edited</Form.Text>
                    </Col>
                    
                    <Col md={6}>
                      <Form.Label className="fw-bold">Status</Form.Label>
                      <Form.Control 
                        name="status" 
                        value={form.status} 
                        disabled 
                        className="bg-light"
                      />
                      <Form.Text className="text-muted">Status cannot be edited</Form.Text>
                    </Col>
                    
                    <Col md={6}>
                      <Form.Label className="fw-bold">Title *</Form.Label>
                      <Form.Control name="title" value={form.title} onChange={handleChange} />
                    </Col>
                    
                    <Col md={6}>
                      <Form.Label className="fw-bold">Slug</Form.Label>
                      <Form.Control name="slug" value={form.slug} onChange={handleChange} />
                    </Col>
                    
                    <Col md={6}>
                      <Form.Label className="fw-bold">Service Type</Form.Label>
                      <Form.Control name="serviceType" value={form.serviceType} onChange={handleChange} />
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
                        disabled 
                        className="bg-light"
                      />
                      <Form.Text className="text-muted">Provider ID cannot be edited</Form.Text>
                    </Col>
                    
                    <Col md={6}>
                      <Form.Label className="fw-bold">Provider Name</Form.Label>
                      <Form.Control name="providerName" value={form.providerName} onChange={handleChange} />
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
                    
                    <Col md={12}>
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
                      <Form.Control name="routeStops" value={form.routeStops} onChange={handleChange} />
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
                      <Form.Control name="vehicleFeatures" value={form.vehicleFeatures} onChange={handleChange} />
                    </Col>

                    {/* Price Details */}
                    <Col xs={12} className="mt-4">
                      <h4 className="section-title mb-3 pb-2 border-bottom">Price Details</h4>
                    </Col>
                    
                    <Col md={6}>
                      <Form.Label className="fw-bold">Amount</Form.Label>
                      <Form.Control name="priceAmount" value={form.priceAmount} onChange={handleChange} />
                    </Col>
                    
                    <Col md={6}>
                      <Form.Label className="fw-bold">Currency</Form.Label>
                      <Form.Control name="priceCurrency" value={form.priceCurrency} onChange={handleChange} />
                    </Col>
                    
                    <Col md={6}>
                      <Form.Label className="fw-bold">Period</Form.Label>
                      <Form.Control name="pricePeriod" value={form.pricePeriod} onChange={handleChange} />
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
                    
                    <Col md={6}>
                      <Form.Label className="fw-bold">Night Trip Charge</Form.Label>
                      <Form.Control name="extraNightTrip" value={form.extraNightTrip} onChange={handleChange} />
                    </Col>
                    
                    <Col md={6}>
                      <Form.Label className="fw-bold">Extra Hour Charge</Form.Label>
                      <Form.Control name="extraExtraHour" value={form.extraExtraHour} onChange={handleChange} />
                    </Col>
                    
                    <Col md={6}>
                      <Form.Label className="fw-bold">Extra KM Charge</Form.Label>
                      <Form.Control name="extraExtraKm" value={form.extraExtraKm} onChange={handleChange} />
                    </Col>

                    {/* Duration Details */}
                    <Col xs={12} className="mt-4">
                      <h4 className="section-title mb-3 pb-2 border-bottom">Duration Details</h4>
                    </Col>
                    
                    <Col md={6}>
                      <Form.Label className="fw-bold">Hours</Form.Label>
                      <Form.Control name="durationHours" value={form.durationHours} onChange={handleChange} />
                    </Col>
                    
                    <Col md={6}>
                      <Form.Label className="fw-bold">Minutes</Form.Label>
                      <Form.Control name="durationMinutes" value={form.durationMinutes} onChange={handleChange} />
                    </Col>
                    
                    <Col md={6}>
                      <Form.Label className="fw-bold">Flexible</Form.Label>
                      <Form.Check 
                        type="checkbox" 
                        name="durationFlexible" 
                        checked={form.durationFlexible} 
                        onChange={handleChange}
                        label="Yes"
                      />
                    </Col>
                    
                    <Col md={6}>
                      <Form.Label className="fw-bold">Max Waiting Time</Form.Label>
                      <Form.Control name="durationMaxWaiting" value={form.durationMaxWaiting} onChange={handleChange} />
                    </Col>

                    {/* Features */}
                    <Col xs={12} className="mt-4">
                      <h4 className="section-title mb-3 pb-2 border-bottom">Features</h4>
                    </Col>
                    
                    <Col md={6}>
                      <Form.Label className="fw-bold">Amenities (comma separated)</Form.Label>
                      <Form.Control name="amenities" value={form.amenities} onChange={handleChange} />
                    </Col>
                    
                    <Col md={6}>
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
                      <Form.Control name="driverRating" value={form.driverRating} onChange={handleChange} />
                    </Col>
                    
                    <Col md={6}>
                      <Form.Label className="fw-bold">Total Trips</Form.Label>
                      <Form.Control name="driverTotalTrips" value={form.driverTotalTrips} onChange={handleChange} />
                    </Col>
                    
                    <Col md={6}>
                      <Form.Label className="fw-bold">Phone</Form.Label>
                      <Form.Control name="driverPhone" value={form.driverPhone} onChange={handleChange} />
                    </Col>
                    
                    <Col md={6}>
                      <Form.Label className="fw-bold">Languages (comma separated)</Form.Label>
                      <Form.Control name="driverLanguages" value={form.driverLanguages} onChange={handleChange} />
                    </Col>
                    
                    <Col md={6}>
                      <Form.Label className="fw-bold">Badges (comma separated)</Form.Label>
                      <Form.Control name="driverBadges" value={form.driverBadges} onChange={handleChange} />
                    </Col>
                    
                    <Col md={6}>
                      <Form.Label className="fw-bold">Specialties (comma separated)</Form.Label>
                      <Form.Control name="driverSpecialties" value={form.driverSpecialties} onChange={handleChange} />
                    </Col>
                    
                    <Col md={6}>
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
                      <Form.Control name="paymentOptions" value={form.paymentOptions} onChange={handleChange} />
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
                      <Form.Control name="contactEmail" value={form.contactEmail} onChange={handleChange} />
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
                      <Form.Control name="bookingMethod" value={form.bookingMethod} onChange={handleChange} />
                    </Col>
                    
                    <Col md={6}>
                      <Form.Label className="fw-bold">Deadline</Form.Label>
                      <Form.Control name="bookingDeadline" value={form.bookingDeadline} onChange={handleChange} />
                    </Col>
                    
                    <Col md={6}>
                      <Form.Label className="fw-bold">Min Advance</Form.Label>
                      <Form.Control name="bookingMinAdvance" value={form.bookingMinAdvance} onChange={handleChange} />
                    </Col>
                    
                    <Col md={6}>
                      <Form.Label className="fw-bold">Confirmation Time</Form.Label>
                      <Form.Control name="bookingConfirmationTime" value={form.bookingConfirmationTime} onChange={handleChange} />
                    </Col>
                    
                    <Col md={12}>
                      <Form.Label className="fw-bold">Peak Season Surcharge</Form.Label>
                      <Form.Control name="bookingPeakSurcharge" value={form.bookingPeakSurcharge} onChange={handleChange} />
                    </Col>

                    {/* Additional Information */}
                    <Col xs={12} className="mt-4">
                      <h4 className="section-title mb-3 pb-2 border-bottom">Additional Information</h4>
                    </Col>
                    
                    <Col md={12}>
                      <Form.Label className="fw-bold">Tags (comma separated)</Form.Label>
                      <Form.Control name="tags" value={form.tags} onChange={handleChange} />
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

                    {/* Submit Button */}
                    <Col xs={12} className="mt-4 text-center">
                      <Button type="submit" className="signup-btn px-5 py-2">
                        Update Service
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