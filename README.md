# Masjid Ibn Khaldun UIKA Donation Platform

Welcome to the Masjid Ibn Khaldun UIKA Donation Platform! This project is a web-based donation system designed to help collect funds for the Masjid Ibn Khaldun UIKA and its Muslimah Center. Built with Vue.js, it features a user-friendly interface, secure donation process, and support for multiple payment methods.

## Features
- **User-Friendly Donation Form**: Input custom donation amounts with Rupiah formatting, select campaigns, and provide personal details (name, email, phone) with anonymous option.
- **Multiple Payment Methods**: Supports Transfer Bank, E-Wallet, and QRIS for flexible donation options.
- **Interactive Campaign Details**: Displays campaign images, progress bars, donor counts, days left, and urgent tags with a "Donasi Sekarang" link.
- **Campaign Overview**: Showcases a homepage with hero section, campaign listings, about us, and contact sections.
- **Donation History**: Lists all donations with donor names (or anonymous), campaign names, amounts, and dates.
- **Interactive UI/UX**: Includes SweetAlert2 notifications, responsive design with Tailwind CSS, and navigation links (back buttons).
- **Client-Side Security**: Integrates reCAPTCHA v3 for basic bot protection (client-side validation only).
- **Backend Integration**: Connects to a Laravel API at `http://127.0.0.1:8001/api/donations` for campaign and donation data.

## Usage
- Access the homepage at `/` to view campaigns, about us, and contact info.
- View campaign details at `/campaign/:id` (e.g., `/campaign/1`) for specific campaign info and donation link.
- Use the donation form at `/donasi` to select a campaign, enter donation details, and choose a payment method.
- Check donation history at `/donations` to see all recorded donations.
- Success/error messages will appear via SweetAlert.

## Prerequisites
- Node.js and npm installed.
- Laravel backend with API endpoints (e.g., `/api/donations`, `/api/campaigns/{id}`).
- Font Awesome CDN for icons (included in `index.html`).
- QRIS image file at `public/images/qris.jpg` (if integrated).

## Contributing
Feel free to contribute! Fork the repository, make changes, and submit a pull request. Please follow the existing code style and add tests if applicable.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments
- Built with love for Masjid Ibn Khaldun UIKA.
- Thanks to xAI for the awesome support in developing this project!

## Contact
For questions or suggestions, reach out to [YourName] at [your-email@example.com].