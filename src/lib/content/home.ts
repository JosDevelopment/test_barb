import { FALLBACK_HOME_BOOKING_CONTENT, FALLBACK_HOME_FAQ_CONTENT, FALLBACK_HOME_GALLARY_CONTENT, FALLBACK_HOME_HERO_CONTENT, FALLBACK_HOME_PRICING_CONTENT, FALLBACK_HOME_SERVICES_CONTENT } from "../../constants/content/HomeConstants"


export async function getHomeContent(){
    const homeHeroContent = FALLBACK_HOME_HERO_CONTENT
    const homeServicesContent = FALLBACK_HOME_SERVICES_CONTENT
    const homeGallaryContent = FALLBACK_HOME_GALLARY_CONTENT
    const homePricingContent = FALLBACK_HOME_PRICING_CONTENT
    const homeBookingContent = FALLBACK_HOME_BOOKING_CONTENT
    const homeFAQContent = FALLBACK_HOME_FAQ_CONTENT

    return{
        homeHeroContent,
        homeServicesContent,
        homeGallaryContent,
        homePricingContent,
        homeBookingContent,
        homeFAQContent,
    }
}