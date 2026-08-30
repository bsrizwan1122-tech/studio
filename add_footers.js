const fs = require('fs');

const footerHtml = `
    <!-- Footer -->
    <footer class="bg-navy pt-16 pb-8 border-t border-gray-800 px-6 mt-16">
        <div class="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
                <a href="/index.html" class="text-2xl font-bold text-white tracking-wide block mb-4">Studio<span class="text-gold">.</span></a>
                <p class="text-gray-400 text-sm mb-6">Premium digital services agency specializing in WordPress, Data Entry, Video Editing, and AI Creation.</p>
                <div class="flex space-x-4">
                    <a href="#" class="text-gray-400 hover:text-gold transition text-xl"><i class="fab fa-twitter"></i></a>
                    <a href="#" class="text-gray-400 hover:text-gold transition text-xl"><i class="fab fa-linkedin"></i></a>
                    <a href="#" class="text-gray-400 hover:text-gold transition text-xl"><i class="fab fa-instagram"></i></a>
                </div>
            </div>
            <div>
                <h4 class="text-white font-bold mb-6 uppercase tracking-wider text-sm">Quick Links</h4>
                <ul class="space-y-3">
                    <li><a href="/index.html" class="text-gray-400 hover:text-gold transition text-sm">Home</a></li>
                    <li><a href="/about.html" class="text-gray-400 hover:text-gold transition text-sm">About Us</a></li>
                    <li><a href="/portfolio.html" class="text-gray-400 hover:text-gold transition text-sm">Portfolio</a></li>
                    <li><a href="/pricing.html" class="text-gray-400 hover:text-gold transition text-sm">Pricing</a></li>
                    <li><a href="/contact.html" class="text-gray-400 hover:text-gold transition text-sm">Contact</a></li>
                </ul>
            </div>
            <div>
                <h4 class="text-white font-bold mb-6 uppercase tracking-wider text-sm">Our Services</h4>
                <ul class="space-y-3">
                    <li><a href="/services/wordpress.html" class="text-gray-400 hover:text-gold transition text-sm">WordPress Development</a></li>
                    <li><a href="/services/data-entry.html" class="text-gray-400 hover:text-gold transition text-sm">Professional Data Entry</a></li>
                    <li><a href="/services/video-editing.html" class="text-gray-400 hover:text-gold transition text-sm">Video Editing</a></li>
                    <li><a href="/services/ai-creation.html" class="text-gray-400 hover:text-gold transition text-sm">AI Creation</a></li>
                </ul>
            </div>
            <div>
                <h4 class="text-white font-bold mb-6 uppercase tracking-wider text-sm">Contact Us</h4>
                <ul class="space-y-4">
                    <li class="flex items-start text-gray-400 text-sm"><i class="fas fa-envelope text-gold mt-1 mr-3"></i><a href="mailto:hello@studio.com" class="hover:text-gold transition">hello@studio.com</a></li>
                    <li class="flex items-start text-gray-400 text-sm"><i class="fab fa-whatsapp text-gold mt-1 mr-3"></i><a href="tel:+1234567890" class="hover:text-gold transition">+1 (234) 567-890</a></li>
                    <li class="flex items-start text-gray-400 text-sm"><i class="fas fa-map-marker-alt text-gold mt-1 mr-3"></i><span>123 Digital Ave, Tech District<br>New York, NY 10001</span></li>
                </ul>
            </div>
        </div>
        <div class="container mx-auto border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
            <p>&copy; 2026 Digital Services Studio. All rights reserved.</p>
            <div class="mt-4 md:mt-0 space-x-4">
                <a href="#" class="hover:text-white transition">Privacy Policy</a>
                <a href="#" class="hover:text-white transition">Terms of Service</a>
            </div>
        </div>
    </footer>
`;

const files = [
    'about.html',
    'portfolio.html',
    'pricing.html',
    'contact.html',
    'services/wordpress.html',
    'services/data-entry.html',
    'services/video-editing.html',
    'services/ai-creation.html',
    'apply-wordpress.html',
    'apply-data-entry.html',
    'apply-video-editing.html',
    'apply-ai-creation.html'
];

files.forEach(file => {
    try {
        let content = fs.readFileSync(file, 'utf8');
        // Only append if it doesn't already have a footer
        if (!content.includes('<footer')) {
            let footer = footerHtml;
            // Adjust relative links based on directory depth
            if (file.startsWith('services/')) {
                footer = footer.replace(/href="\//g, 'href="../');
            } else {
                footer = footer.replace(/href="\//g, 'href="');
            }
            content = content.replace('</body>', footer + '\n</body>');
            fs.writeFileSync(file, content);
            console.log('Added footer to: ' + file);
        }
    } catch (e) {
        console.error('Could not process ' + file + ':', e.message);
    }
});
