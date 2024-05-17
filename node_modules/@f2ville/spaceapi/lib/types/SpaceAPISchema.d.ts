type SpaceAPISchema = {
    api: string;
    api_compatibility: Array<string>;
    space: string;
    logo: string;
    url: string;
    location: {
        address?: string;
        lon: number;
        lat: number;
        timezone: string;
    };
    contact: {
        phone?: string;
        sip?: string;
        keymasters?: Array<{
            name?: string;
            irc_nick?: string;
            phone?: string;
            email?: string;
            twitter?: string;
            xmpp?: string;
            mastodon?: string;
            matrix?: string;
        }>;
        email?: string;
        irc?: string;
        ml?: string;
        twitter?: string;
        facebook?: string;
        identica?: string;
        foursquare?: string;
        gopher?: string;
        matrix?: string;
        mastodon?: string;
        issue_mail?: string;
        mumble?: string;
        xmpp?: string;
    };
    issue_report_channels: Array<string>;
    state?: {
        icon?: {
            open: string;
            closed: string;
        };
        open?: boolean | null;
        lastchange?: number;
        trigger_person?: string;
        message?: string;
    };
    projects: Array<string>;
    events: Array<{
        name: string;
        type: string;
        timestamp: number;
        extra?: string;
    }>;
    spacefed?: {
        spacenet: boolean;
        spacesaml: boolean;
    };
    cam?: {
        stream_url: string;
        static_url: string;
        edit_url: string;
    };
    sensors?: {
        temperature?: Array<{
            value: number;
            unit: string;
            location: string;
            name?: string;
            description?: string;
        }>;
        door_locked?: Array<{
            value: boolean;
            location: string;
            name?: string;
            description?: string;
        }>;
        barometer?: Array<{
            value: number;
            unit: string;
            location: string;
            name?: string;
            description?: string;
        }>;
        humidity?: Array<{
            value: number;
            unit: string;
            location: string;
            name?: string;
            description?: string;
        }>;
        radiation?: Array<{
            alpha?: {
                value: number;
                unit: string;
                dead_time?: number;
                conversion_factor?: number;
                location?: string;
                name?: string;
                description?: string;
            };
            beta?: {
                value: number;
                unit: string;
                dead_time?: number;
                conversion_factor?: number;
                location?: string;
                name?: string;
                description?: string;
            };
            gamma?: {
                value: number;
                unit: string;
                dead_time?: number;
                conversion_factor?: number;
                location?: string;
                name?: string;
                description?: string;
            };
            beta_gamma?: {
                value: number;
                unit: string;
                dead_time?: number;
                conversion_factor?: number;
                location?: string;
                name?: string;
                description?: string;
            };
        }>;
        beverage_supply?: Array<{
            value: number;
            unit: string;
            location?: string;
            name?: string;
            description?: string;
        }>;
        power_consumption?: Array<{
            value: number;
            unit: string;
            location: string;
            name?: string;
            description?: string;
        }>;
        wind?: Array<{
            properties: {
                direction: number;
                speed: number;
                gust: number;
                elevation: number;
            };
            location: string;
            name?: string;
            description?: string;
        }>;
        network_connections?: Array<{
            value: number;
            type: string;
            machines?: Array<{
                name?: string;
                mac: string;
            }>;
            location?: string;
            name?: string;
            description?: string;
        }>;
        account_balance?: Array<{
            value: number;
            unit: string;
            location?: string;
            name?: string;
            description?: string;
        }>;
        total_member_count?: Array<{
            value: number;
            location?: string;
            name?: string;
            description?: string;
        }>;
        people_now_present?: Array<{
            value: number;
            location?: string;
            name?: string;
            names?: Array<string>;
            description?: string;
        }>;
        network_traffic?: Array<{
            properties: {
                bits_per_second?: number;
                packets_per_second?: number;
            };
            location?: string;
            name?: string;
            description?: string;
        }>;
    };
    feeds?: {
        blog?: {
            type?: string;
            url: string;
        };
        wiki?: {
            type?: string;
            url: string;
        };
        calendar?: {
            type?: string;
            url: string;
        };
        flickr?: {
            type?: string;
            url: string;
        };
    };
    links?: Array<{
        name: string;
        url: string;
        description?: string;
    }>;
    membership_plans?: Array<{
        name: string;
        value: number;
        currency: string;
        billing_interval: string;
        description?: string;
    }>;
};
export default SpaceAPISchema;
