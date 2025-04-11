export function formatCurrency(price: number) {
    return Intl.NumberFormat('es-US', {
        style: 'currency',
        currency: 'USD'
    }).format(price)
}

export function getImagePath(imagePath: string) {
    const cloudinaryBaseUrl = 'https://res.cloudinary.com'
    if(imagePath.startsWith(cloudinaryBaseUrl)) {
        return imagePath
    } else {
        return `/products/${imagePath}.jpg`
    }
}