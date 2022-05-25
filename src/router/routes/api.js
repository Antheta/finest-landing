// ** API Routes

// ** to use environment variables
require('dotenv').config()

const api = {
    endpoint: `${process.env.API_ENDPOINT}/api`,
    routes: {
        // ** Alerts
        alerts: {
            index: '/alerts',
            byId: '/alerts/:id'
        },
        // ** Currencies
        currencies: {
            index: '/currencies',
            byId: '/currencies/:id',
            bySlug: '/currencies/:slug'
        },
        // ** teams
        teams: {
            index: '/teams',
            byId: '/teams/:id'
        },
        // ** Account
        account: {
            details: '/account',
            devices: '/devices'
        },
        // ** Authentication
        auth: {
            login: '/login',
            logout: '/logout',
            logoutAll: '/logout/all',
            recovery: {
                changePassword: '/change-password',
            }
        },
        // ** Emails
        emails: {
            verification: '/email/verification',
            requestPasswordReset: '/reset-password',
            // subscribe a campaign
            subscribe: '/emails/subscribe/:campaign',
            // unsubscribe from all campaigns
            unsubscribe: '/emails/unsubscribe/:email'
        }
    }
}

export default api