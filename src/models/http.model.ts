export interface httpConfig {
    url?: string
    method?: string
    feedbackMode?: 'snackBar' | 'page' | 'none'
    feedbackMsg?: string
    log?: string
    cache?: boolean
    params?: GenericObject
    headers?: GenericObject
    body?: GenericObject | string
    showSpinner?: boolean
    retries?: number
}

class GenericObject {
	[key: string]: any
}

