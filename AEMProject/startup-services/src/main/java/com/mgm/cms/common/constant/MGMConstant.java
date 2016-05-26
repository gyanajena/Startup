/*
 * CQPageConstants.java
 *
 * Created on Jun 18, 2012
 *
 * Copyright 2012, SapientNitro;  All Rights Reserved.
 *
 * This software is the confidential and proprietary information of
 * SapientNitro, ("Confidential Information"). You shall not
 * disclose such Confidential Information and shall use it only in
 * accordance with the terms of the license agreement you entered into
 * with SapientNitro.
 * 
 */
package com.mgm.cms.common.constant;

public final class MGMConstant {

	/**
	 * private constructor to prevent instantiation of class.
	 */
	private MGMConstant() {

	}

	/**
	 * The Enum EVENT_STATUS.
	 */
	public enum EVENT_STATUS {

		/** The available. */
		AVAILABLE,
		/** The unavailable. */
		UNAVAILABLE,
		/** The sold out. */
		SOLD_OUT,
		/** The past. */
		PAST
	}

	/** The Constant JCR_PATH_CONST. */
	public static final String JCR_PATH_CONST = "JCR_PATH";
	
	// MGM Property related node property keys
	/** The Constant PROPERTY_NAME. */
	public static final String PROPERTY_NAME = "propertyName";
	
	
	
	/** The Constant JS_ROOT_PATH. */
	public static final String JS_ROOT_PATH = "jsRootPath";
	
	/** The Constant BRIGHT_TAG_TAGID. */
	public static final String BRIGHT_TAG_TAGID = "brightTagSiteId";
	
	/** The Constant ADOBE_DTM_SCRIPT. */
	public static final String ADOBE_DTM_SCRIPT = "adobeDTMScript";
	
	/** The Constant GIGYA URL. */
	public static final String GIGYA_URL = "gigyaUrl";
	
	/** The Constant S7_PATH_PROPERTY. */
	public static final String S7_PATH_PROPERTY = "cq:cloudserviceconfigs";
	
	/** The Constant S7_PATH_ID. */
	public static final String S7_PATH_ID = "/etc/cloudservices/scene7";
	
	/** The Constant S7_ROOT_FOLDER. */
	public static final String S7_ROOT_FOLDER = "s7RootPath";
	
	/** The Constant S7_PUBLISH_SERVER. */
	public static final String S7_PUBLISH_SERVER = "publishServer";
	
	/** The Constant CONTENT_TYPE_POKER. */
	public static final String CONTENT_TYPE_POKER = "poker";
	
	/** The Constant CONTENT_TYPE_SLOT. */
	public static final String CONTENT_TYPE_SLOT = "slot";
	
	/** The Constant CATEGORY_TYPE_MLIFE. */
	public static final String CATEGORY_TYPE_MLIFE = "mlife";
	
	/** The Constant COMPONENT_TYPE_SPECIALREQUEST. */
	public static final String COMPONENT_TYPE_SPECIALREQUEST = "SPECIAL_REQUEST";

	/** The Constant PARSYS_NODE. */
	public static final String PARSYS_NODE = "par";
	
	/** The Constant REFERENCE_NODE. */
	public static final String REFERENCE_NODE = "reference";

	/** The Constant PROPERTY_NODE. */
	public static final String PROPERTY_NODE = "property";
	
	/** The Constant SHOW_NODE. */
	public static final String SHOW_NODE = "show";
	
	/** The Constant HOTEL_SETTINGS_NODE. */
	public static final String HOTEL_SETTINGS_NODE = "hotelSettings";
	
	/** The Constant DEFAULT_IMAGE_NODE. */
	public static final String DEFAULT_IMAGE_NODE = "defaultImage";
	
	/** The Constant TILE_IMAGE_NODE. */
	public static final String TILE_IMAGE_NODE = "tileImage";
	
	/** The Constant IMAGE_ALT_TEXT_NODE. */
	public static final String IMAGE_ALT_TEXT_NODE = "defaultImageAltText";
	
	/** The Constant IMAGE_NODE. */
	public static final String IMAGE_NODE = "images";
	
	/** The Constant IMAGE_NODE_ALT_TEXT. */
	public static final String IMAGE_NODE_ALT_TEXT = "imageAltText";
	
	/** The Constant COPY_ELEMENTS_NODE. */
	public static final String COPY_ELEMENTS_NODE = "copyelements";
	
    /** The Constant TAGS_PROPERTY. */
    public static final String TAGS_PROPERTY = "tags";
    
    /** The Constant SSI. */
    public static final String SSI = "ssi";
    
    /** The Constant CQ_TAGS_PROPERTY. */
    public static final String CQ_TAGS_PROPERTY = "cq:tags";
    
    /** The Constant ACCESSIBILITY_PROPERTY. */
    public static final String ACCESSIBILITY_PROPERTY = "adaAmenities";
    
    /** The Constant COMPONENT_ID. */
    public static final String COMPONENT_ID = "id";

	// Locales
	/** The Constant LOCALE_ENGLISH. */
	public static final String LOCALE_ENGLISH = "en";

	// Selectors
	/** The Constant SELECTOR_ROOM_DETAIL. */
	public static final String SELECTOR_ROOM_DETAIL = "roomDetail";
	
	/** The Constant SELECTOR_ROOM_RESERVE_DETAIL. */
	public static final String SELECTOR_ROOM_RESERVE_DETAIL = "roomReserveDetail";
	
	/** The Constant SELECTOR_ROOM_COMPONENT_DETAIL. */
	public static final String SELECTOR_ROOM_COMPONENT_DETAIL = "roomComponent";
	
	/** The Constant SELECTOR_OFFER. */
	public static final String SELECTOR_OFFER = "offer";
	
	/** The Constant SELECTOR_OFFER_LIST. */
	public static final String SELECTOR_OFFER_LIST = "offerList";
	
	/** The Constant SELECTOR_ITINERARY_ROOM_DETAIL. */
	public static final String SELECTOR_ITINERARY_ROOM_DETAIL = "itineraryRoomDetail";
	
	/** The Constant SELECTOR_ITINERARY_COMPONENT_DETAIL. */
	public static final String SELECTOR_ITINERARY_COMPONENT_DETAIL = "component";
	
	/** The Constant SELECTOR_ITINERARY_DINING_DETAIL. */
	public static final String SELECTOR_ITINERARY_DINING_DETAIL = "itineraryDineDetail";
	
	/** The Constant SELECTOR_ITINERARY_PROGRAM_DETAIL. */
	public static final String SELECTOR_ITINERARY_PROGRAM_DETAIL = "programDetail";
	
	/** The Constant SELECTOR_ROOM_COMPARISON. */
	public static final String SELECTOR_ROOM_COMPARISON = "roomComparison";
	
	/** The Constant SELECTOR_RESTAURANT_DETAIL. */
	public static final String SELECTOR_RESTAURANT_DETAIL = "restaurantDetail";
	
	/** The Constant SELECTOR_ROOM_FULL_DETAIL. */
	public static final String SELECTOR_ROOM_FULL_DETAIL = "roomFullDetail";
	
	/** The Constant SELECTOR_SHOW_FULL_DETAILS. */
	public static final String SELECTOR_SHOW_FULL_DETAILS = "showDetail";
	
	/** The Constant SELECTOR_ITINERARY_SHOW_DETAILS. */
	public static final String SELECTOR_ITINERARY_SHOW_DETAILS = "itineraryShowDetail";
	
	/** The Constant SELECTOR_SHOW_TICKETING_PROGRAM_DETAILS. */
	public static final String SELECTOR_SHOW_TICKETING_PROGRAM_DETAILS = "ticketingProgramDetail";
	
	/** The Constant SELECTOR_SAVE_ITINERARY_SHOW_DETAILS. */
	public static final String SELECTOR_SAVE_ITINERARY_SHOW_DETAILS = "showTileDetails";
	
	/** The Constant SELECTOR_SAVE_ITINERARY_SHOW_DETAILS. */
	public static final String SELECTOR_PROPERTY_SHOW_DETAILS = "propertyShowDetails";
	
	/** The Constant PROPERTY_DETAIL. */
	public static final String PROPERTY_DETAIL = "propertyDetail";
	
	/** The Constant SELECTOR_SHOW_TILE_DETAILS. */
	public static final String SELECTOR_SHOW_TILE_DETAILS = "showTileDetails";
	
	/** The Constant SELECTOR_DELIVERY_METHODS. */
	public static final String SELECTOR_DELIVERY_METHODS = "deliveryMethod";
	
	/** The Constant SELECTOR_MLIFE_TIER. */
	public static final String SELECTOR_MLIFE_TIER = "mlifeTier";
	
	/** The Constant SELECTOR_SITEID_DETAILS. */
	public static final String SELECTOR_SITEID_DETAILS = "siteIdDetails";
	
	/** The Constant SELECTOR_PROGRAM_SEGMENT_DETAILS. */
	public static final String SELECTOR_PROGRAM_SEGMENT_DETAILS = "segment";
	
	//Misc
	/** The Constant SOURCE_SYSTEM. */
	public static final String SOURCE_SYSTEM = "AEM";
	
	/** The Constant AEM_CONTENT_TYPE. */
	public static final String AEM_CONTENT_TYPE = "JSON";
	
	/** The Constant SELECTOR_OFFER_GRID. */
	public static final String SELECTOR_OFFER_GRID = "offergrid";
	
	/** The Constant SELECTOR_SHOW_GRID. */
	public static final String SELECTOR_SHOW_GRID = "showgrid";
	
	/** The Constant SHOW_OFFER_DETAIL_VALID. */
	public static final String SHOW_OFFER_DETAIL_VALID = "showOfferDetailValid";
	
	/** The Constant ROOM_OFFER_DETAIL_VALID. */
	public static final String ROOM_OFFER_DETAIL_VALID = "roomOfferDetailValid";
	
	/** The Constant OFFER_DETAIL_INVALID. */
	public static final String OFFER_DETAIL_INVALID = "offerDetailInvalid";
	
	/** The Constant SHOW_OFFER_DETAIL_INVALID. */
	public static final String SHOW_OFFER_DETAIL_INVALID = "showOfferDetailInvalid";
	
	/** The Constant ROOM_OFFER_DETAIL_INVALID. */
	public static final String ROOM_OFFER_DETAIL_INVALID = "roomOfferDetailInvalid";
	
	// ccm Node properties for property Id's
	/** The Constant PROPERTY_ID_PATH. */
	public static final String PROPERTY_ID_PATH = "propertyIdPath";
	
	/** The Constant JCR_CONTENT_PAR. */
	public static final String JCR_CONTENT_PAR = "/jcr:content/par";
	
	/** The Constant JCR_REFERENCE_NODE. */
	public static final String JCR_REFERENCE_NODE = "jcr:content/reference";
	
	/** The Constant JCR_REFERENCE_REGION_NODE. */
	public static final String JCR_REFERENCE_REGION_NODE = "jcr:content/reference/region";
	
	/** The Constant JCR_PROPERTY_NODE. */
	public static final String JCR_PROPERTY_NODE = "jcr:content/par/property";
	
	/** The Constant JCR_MLIFE_NODE. */
	public static final String JCR_MLIFE_NODE = "/jcr:content/par/mlife";
	
	/** The Constant SSI_PROPERTY_NAME. */
	public static final String SSI_PROPERTY_NAME = "propertyName";
	
	/** The Constant PAGE_PATH. */
	public static final String PAGE_PATH = "pagePath";
	
	/** The Constant NODE_PROPERTY_NAME. */
	public static final String NODE_PROPERTY_NAME = "name";
	
	/** The Constant JCR_EXCLUDE_COMPARE_ROOM. */
	public static final String JCR_EXCLUDE_COMPARE_ROOM = "excludeCompare";
	
	/** The Constant NODE_AMENITY_NAME. */
	public static final String NODE_AMENITY_NAME = "amenityValue";
	
	/** The Constant NODE_GET_DIRECTIONS. */
	public static final String NODE_GET_DIRECTIONS = "getDirectionsUrl";
	
	/** The Constant DETAIL_URL_PROPERTY_NAME. */
	public static final String DETAIL_URL_PROPERTY_NAME = "detailPageUrl";
	
	/** The Constant SHARE_TITLE_PROPERTY_NAME. */
	public static final String SHARE_TITLE_PROPERTY_NAME = "shareTitle";
	
	/** The Constant SHARE_DESC_PROPERTY_NAME. */
	public static final String SHARE_DESC_PROPERTY_NAME = "shareDescription";
	
	/** The Constant SHARE_IMG_PROPERTY_NAME. */
	public static final String SHARE_IMG_PROPERTY_NAME = "shareImageUrl";
	
	/** The Constant COMPONENTS_PROPERTY_NAME. */
	public static final String COMPONENTS_PROPERTY_NAME = "components";
	
	/** The Constant HEADER_PROPERTY_NAME. */
	public static final String HEADER_PROPERTY_NAME = "header";
	
	/** The Constant OFFER_PROPERTY_NAME. */
	public static final String OFFER_PROPERTY_NAME = "offer";
	
	/** The Constant END_PROPERTY_NAME. */
	public static final String END_PROPERTY_NAME = "end";
	
	/** The Constant START_PROPERTY_NAME. */
	public static final String START_PROPERTY_NAME = "start";
	
	// Image Rendition for RoomBooking CCM ,SSI Include
	/** The Constant REND_IMG_DEFAULT. */
	public static final String REND_IMG_DEFAULT = ".image.100.100.high.jpg";
	
	/** The Constant REND_S. */
	public static final String REND_S = ".image.744.418.high.jpg";
	
	/** The Constant REND_S2. */
	public static final String REND_S2 = ".image.1488.836.high.jpg";
	
	/** The Constant REND_M. */
	public static final String REND_M = ".image.195.195.high.jpg";
	
	/** The Constant REND_M2. */
	public static final String REND_M2 = ".image.390.390.high.jpg";
	
	/** The Constant REND_LMIN. */
	public static final String REND_LMIN = ".image.172.172.high.jpg";
	
	/** The Constant REND_LMIN2. */
	public static final String REND_LMIN2 = ".image.344.344.high.jpg";
	
	/** The Constant REND_L. */
	public static final String REND_L = ".image.218.172.high.jpg";
	
	/** The Constant REND_L2. */
	public static final String REND_L2 = ".image.436.343.high.jpg";
	
	/** The Constant REND_XLMIN. */
	public static final String REND_XLMIN = ".image.274.215.high.jpg";
	
	/** The Constant REND_XLMIN2. */
	public static final String REND_XLMIN2 = ".image.548.430.high.jpg";
	
	/** The Constant REND_XL. */
	public static final String REND_XL = ".image.344.224.high.jpg";
	
	/** The Constant REND_XL2. */
	public static final String REND_XL2 = ".image.688.448.high.jpg";	
	
	/** The Constant REND_S_V2. */
	public static final String REND_S_V2 = ".image.744.744.high.jpg";
	
	/** The Constant REND_S2_V2. */
	public static final String REND_S2_V2 = ".image.1488.1488.high.jpg";
	
	/** The Constant REND_M_V2. */
	public static final String REND_M_V2 = ".image.211.211.high.jpg";
	
	/** The Constant REND_M2_V2. */
	public static final String REND_M2_V2 = ".image.422.422.high.jpg";
	
	/** The Constant REND_L_V2. */
	public static final String REND_L_V2 = ".image.218.218.high.jpg";
	
	/** The Constant REND_L2_V2. */
	public static final String REND_L2_V2 = ".image.436.436.high.jpg";
	
	/** The Constant REND_XL_V2. */
	public static final String REND_XL_V2 = ".image.292.292.high.jpg";
	
	/** The Constant REND_XL2_V2. */
	public static final String REND_XL2_V2 = ".image.584.584.high.jpg";	
	
	/** The Constant REND_M_V3. */
	public static final String REND_M_V3 = ".image.440.211.high.jpg";
	
	/** The Constant REND_M2_V3. */
	public static final String REND_M2_V3 = ".image.880.422.high.jpg";
	
	/** The Constant REND_L_V3. */
	public static final String REND_L_V3 = ".image.454.218.high.jpg";
	
	/** The Constant REND_L2_V3. */
	public static final String REND_L2_V3 = ".image.908.436.high.jpg";
	
	/** The Constant REND_XL_V3. */
	public static final String REND_XL_V3 = ".image.608.292.high.jpg";
	
	/** The Constant REND_XL2_V3. */
	public static final String REND_XL2_V3 = ".image.1216.584.high.jpg";
	
	// String representation for image rendition sizes
	/** The Constant S. */
	public static final String S = "s";
	
	/** The Constant SPROP. */
	public static final String SPROP = "sProp";
    
    /** The Constant S2. */
    public static final String S2 = "s2";
    
    /** The Constant S2PROP. */
    public static final String S2PROP = "s2Prop";
    
    /** The Constant M. */
    public static final String M = "m";
    
    /** The Constant M2. */
    public static final String M2 = "m2";
    
    /** The Constant LMIN. */
    public static final String LMIN = "lMin";
    
    /** The Constant LMIN2. */
    public static final String LMIN2 = "lMin2";
    
    /** The Constant L. */
    public static final String L = "l";
    
    /** The Constant L2. */
    public static final String L2 = "l2";
    
    /** The Constant XLMIN. */
    public static final String XLMIN = "xlMin";
    
    /** The Constant XLMIN2. */
    public static final String XLMIN2 = "xlMin2";
    
    /** The Constant XL. */
    public static final String XL = "xl";
    
    /** The Constant XL2. */
    public static final String XL2 = "xl2";
	
	/** The Constant XXL. */
    public static final String XXL = "xxl";
    
    /** The Constant XXL2. */
    public static final String XXL2 = "xxl2";
	
	/** The Constant REND_230_230. */
	public static final String REND_230_230 = ".image.230.230.high.jpg";
	
	/** The Constant REND_90_90. */
	public static final String REND_90_90 = ".image.90.90.high.jpg";
	
	/** The Constant TIMEZONE_ID_PACIFIC. */
	public static final String TIMEZONE_ID_PACIFIC = "America/Los_Angeles";
	
	/** The Constant TIMEZONE_ID_UTC. */
	public static final String TIMEZONE_ID_UTC = "UTC";
	
	/** The Constant ROOM_OFFER_TERMS_CONDITIONS. */
	public static final String ROOM_OFFER_TERMS_CONDITIONS = "offerTermsConditions";
	
	/** The Constant PROP_SEGMENTS. */
	public static final Integer PROP_SEGMENTS = 4;
	
	/** The Constant LOCALE_SEGMENTS. */
	public static final Integer LOCALE_SEGMENTS = 2;
	
	/** The Constant CCM_SEGMENTS. */
	public static final Integer CCM_SEGMENTS = 5;
	
	/** The Constant BYTES. */
	public static final Integer BYTES = 1024;
	
	/** The Constant BYTES_DOUBLE. */
	public static final Double BYTES_DOUBLE = 1024.00;
	
	/** The Constant SHORT_DESC_LIMIT. */
	public static final Integer SHORT_DESC_LIMIT = 115;
	
	/** The Constant LONG_DESC_LIMIT. */
	public static final Integer LONG_DESC_LIMIT = 170;
	
	/*Workflow related constants*/
	/** The Constant SLASH_EN_PATH. */
	public static final String SLASH_EN_PATH = "/en/";
	
	/** The Constant EN_PATH_MATCH. */
	public static final String EN_PATH_MATCH = "/en$";
	
	/** The Constant IMAGE. */
	public static final String IMAGE = "image";
	
	/** The Constant VALUE. */
	public static final String VALUE = "value";
	
	/** The Constant PAR_AMENITY. */
	public static final String PAR_AMENITY = "/jcr:content/par/amenity";
	
	/** The Constant BOOKABLE_ONLINE. */
	public static final String BOOKABLE_ONLINE = "bookableOnline";
	
	/** The Constant CCM_ROOT_PATH. */
	public static final String CCM_ROOT_PATH = "/content/ccm";
	
	/** The Constant JCR_CONTENT_SITE_REF. */
	public static final String JCR_CONTENT_SITE_REF = "jcr:content/siteRef";
	
	/** The Constant SLASH_JCR_CONTENT_REFERENCE. */
	public static final String SLASH_JCR_CONTENT_REFERENCE = "/jcr:content/reference";
	
	/** The Constant SLASH_JCR_CONTENT. */
	public static final String SLASH_JCR_CONTENT = "/jcr:content";
	
	/** The Constant JCR_PAR_SHOW. */
	public static final String JCR_PAR_SHOW = "jcr:content/par/show";
	
	/** The Constant QUERY_PROPERTY_1. */
	public static final String QUERY_PROPERTY_1 = "1_property";
	
	/** The Constant QUERY_PROPERTY_1_VALUE. */
	public static final String QUERY_PROPERTY_1_VALUE = "1_property.value";
	
	/** The Constant QUERY_PLIMIT. */
	public static final String QUERY_PLIMIT = "p.limit";
	
	/** The Constant QUERY_POFFSET. */
	public static final String QUERY_POFFSET = "p.offset";
	
	/** The Constant QUERY_FULLTEXT. */
	public static final String QUERY_FULLTEXT = "fulltext";
	
	/** The Constant PRICE. */
	public static final String PRICE = "price";
}

