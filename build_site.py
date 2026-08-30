import os

# Base layout (header + footer)
HEADER = """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Digital Services Studio | {title}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="{prefix}styles.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body class="bg-navy text-gray-100 font-sans antialiased">
    <header class="sticky top-0 z-50 bg-navy bg-opacity-95 backdrop-blur-md border-b border-gray-800">
        <div class="container mx-auto px-6 py-4 flex justify-between items-center">
            <div class="text-2xl font-bold text-white tracking-wide">
                <a href="{prefix}index.html">Studio<span class="text-gold">.</span></a>
            </div>
            <nav class="hidden md:flex space-x-8 items-center">
                <a href="{prefix}index.html" class="hover:text-gold transition">Home</a>
                <a href="{prefix}about.html" class="hover:text-gold transition">About</a>
                <div class="relative nav-dropdown py-2">
                    <button class="hover:text-gold transition flex items-center">
                        Services <i class="fas fa-chevron-down ml-1 text-xs"></i>
                    </button>
                    <div class="absolute left-0 mt-2 w-56 bg-blue rounded-md shadow-lg py-2 nav-dropdown-menu">
                        <a href="{prefix}services/wordpress.html" class="block px-4 py-2 hover:bg-gray-700 hover:text-gold">WordPress Development</a>
                        <a href="{prefix}services/data-entry.html" class="block px-4 py-2 hover:bg-gray-700 hover:text-gold">Data Entry</a>
                        <a href="{prefix}services/video-editing.html" class="block px-4 py-2 hover:bg-gray-700 hover:text-gold">Video Editing</a>
                        <a href="{prefix}services/ai-creation.html" class="block px-4 py-2 hover:bg-gray-700 hover:text-gold">AI Creation</a>
                    </div>
                </div>
                <a href="{prefix}portfolio.html" class="hover:text-gold transition">Portfolio</a>
                <a href="{prefix}pricing.html" class="hover:text-gold transition">Pricing</a>
                <a href="{prefix}contact.html" class="btn-primary ml-4">Get a Quote</a>
            </nav>
        </div>
    </header>
"""

FOOTER = """
    <!-- Universal CTA (For service pages) -->
    {cta_block}

    <footer class="bg-navy pt-16 pb-8 border-t border-gray-800 px-6">
        <div class="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
                <a href="{prefix}index.html" class="text-2xl font-bold text-white tracking-wide block mb-4">Studio<span class="text-gold">.</span></a>
                <p class="text-gray-400 text-sm mb-6">Premium digital services agency specializing in WordPress, Data Entry, Video Editing, and AI Creation.</p>
            </div>
            <div>
                <h4 class="text-white font-bold mb-6 uppercase tracking-wider text-sm">Quick Links</h4>
                <ul class="space-y-3">
                    <li><a href="{prefix}index.html" class="text-gray-400 hover:text-gold transition text-sm">Home</a></li>
                    <li><a href="{prefix}about.html" class="text-gray-400 hover:text-gold transition text-sm">About Us</a></li>
                    <li><a href="{prefix}portfolio.html" class="text-gray-400 hover:text-gold transition text-sm">Portfolio</a></li>
                    <li><a href="{prefix}contact.html" class="text-gray-400 hover:text-gold transition text-sm">Contact</a></li>
                </ul>
            </div>
            <div>
                <h4 class="text-white font-bold mb-6 uppercase tracking-wider text-sm">Our Services</h4>
                <ul class="space-y-3">
                    <li><a href="{prefix}services/wordpress.html" class="text-gray-400 hover:text-gold transition text-sm">WordPress</a></li>
                    <li><a href="{prefix}services/data-entry.html" class="text-gray-400 hover:text-gold transition text-sm">Data Entry</a></li>
                    <li><a href="{prefix}services/video-editing.html" class="text-gray-400 hover:text-gold transition text-sm">Video Editing</a></li>
                    <li><a href="{prefix}services/ai-creation.html" class="text-gray-400 hover:text-gold transition text-sm">AI Creation</a></li>
                </ul>
            </div>
            <div>
                <h4 class="text-white font-bold mb-6 uppercase tracking-wider text-sm">Contact Us</h4>
                <ul class="space-y-4">
                    <li class="flex items-start text-gray-400 text-sm">
                        <i class="fas fa-envelope text-gold mt-1 mr-3"></i> hello@studio.com
                    </li>
                </ul>
            </div>
        </div>
        <div class="container mx-auto border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
            &copy; 2026 Digital Services Studio. All rights reserved.
        </div>
    </footer>
</body>
</html>
"""

UNIVERSAL_CTA = """
<section class="py-16 px-6 bg-gradient-to-r from-navy to-blue text-center border-t border-gray-800">
    <div class="container mx-auto">
        <h3 class="text-3xl font-bold mb-6">Ready to Start?</h3>
        <div class="flex justify-center gap-4">
            <a href="{prefix}contact.html?type=order" class="btn-primary">Get Order</a>
            <a href="{prefix}contact.html?type=quote" class="btn-secondary text-white border-white">Get a Quote / Place an Order</a>
        </div>
        <p class="mt-4 text-sm text-gray-400">Reply within 24 hours &middot; Free consultation.</p>
    </div>
</section>
"""

PAGES = {
    "about.html": {
        "title": "About Us",
        "prefix": "",
        "content": '''
        <section class="py-20 px-6 container mx-auto">
            <h1 class="text-4xl font-bold mb-8 text-center">About Our Studio</h1>
            <div class="max-w-3xl mx-auto text-gray-400 mb-16 text-center">
                <p class="mb-4">We are a dedicated team of digital experts committed to elevating your brand through high-quality WordPress development, precise data entry, dynamic video editing, and cutting-edge AI creation.</p>
                <p>Our mission is to bridge the gap between creative vision and technical execution.</p>
            </div>
            
            <div class="grid md:grid-cols-2 gap-8 mb-20">
                <div class="bg-blue p-8 rounded-xl">
                    <h3 class="text-2xl font-bold mb-4 text-gold">Our Mission</h3>
                    <p class="text-gray-400">To empower businesses with top-tier digital assets that drive growth and engagement, ensuring every project is delivered with excellence.</p>
                </div>
                <div class="bg-blue p-8 rounded-xl">
                    <h3 class="text-2xl font-bold mb-4 text-gold">Our Vision</h3>
                    <p class="text-gray-400">To be the globally trusted partner for agencies and businesses seeking reliable, high-end digital fulfillment.</p>
                </div>
            </div>

            <h2 class="text-3xl font-bold text-center mb-10">How We Work</h2>
            <div class="flex flex-col md:flex-row justify-between items-center gap-6">
                <div class="bg-navy border border-gray-700 p-6 rounded-lg w-full text-center">
                    <div class="text-gold text-2xl mb-2">1</div>
                    <h4 class="font-bold">Consultation</h4>
                </div>
                <i class="fas fa-arrow-right hidden md:block text-gray-600"></i>
                <div class="bg-navy border border-gray-700 p-6 rounded-lg w-full text-center">
                    <div class="text-gold text-2xl mb-2">2</div>
                    <h4 class="font-bold">Planning</h4>
                </div>
                <i class="fas fa-arrow-right hidden md:block text-gray-600"></i>
                <div class="bg-navy border border-gray-700 p-6 rounded-lg w-full text-center">
                    <div class="text-gold text-2xl mb-2">3</div>
                    <h4 class="font-bold">Execution</h4>
                </div>
                <i class="fas fa-arrow-right hidden md:block text-gray-600"></i>
                <div class="bg-navy border border-gray-700 p-6 rounded-lg w-full text-center">
                    <div class="text-gold text-2xl mb-2">4</div>
                    <h4 class="font-bold">Delivery & Support</h4>
                </div>
            </div>
        </section>
        ''',
        "show_cta": True
    },
    "portfolio.html": {
        "title": "Portfolio",
        "prefix": "",
        "content": '''
        <section class="py-20 px-6 container mx-auto">
            <h1 class="text-4xl font-bold mb-12 text-center">Our Portfolio</h1>
            
            <div class="flex justify-center space-x-4 mb-12">
                <button class="px-6 py-2 bg-gold text-white rounded-full font-semibold">All</button>
                <button class="px-6 py-2 bg-blue hover:bg-gray-700 text-gray-300 rounded-full font-semibold transition">Websites</button>
                <button class="px-6 py-2 bg-blue hover:bg-gray-700 text-gray-300 rounded-full font-semibold transition">Data Entry</button>
                <button class="px-6 py-2 bg-blue hover:bg-gray-700 text-gray-300 rounded-full font-semibold transition">Video Edits</button>
                <button class="px-6 py-2 bg-blue hover:bg-gray-700 text-gray-300 rounded-full font-semibold transition">AI Creation</button>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="portfolio-img-container bg-blue rounded-lg cursor-pointer p-4">
                    <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600" class="portfolio-img w-full h-64 object-cover rounded-md mb-4" alt="Portfolio 1">
                    <h4 class="font-bold text-lg">E-Commerce Website</h4>
                    <span class="text-gold text-sm">Websites</span>
                </div>
                <div class="portfolio-img-container bg-blue rounded-lg cursor-pointer p-4">
                    <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600" class="portfolio-img w-full h-64 object-cover rounded-md mb-4" alt="Portfolio 1">
                    <h4 class="font-bold text-lg">Data Cleansing</h4>
                    <span class="text-gold text-sm">Data Entry</span>
                </div>
                <div class="portfolio-img-container bg-blue rounded-lg cursor-pointer p-4">
                    <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=600" class="portfolio-img w-full h-64 object-cover rounded-md mb-4" alt="Portfolio 1">
                    <h4 class="font-bold text-lg">Corporate Promo</h4>
                    <span class="text-gold text-sm">Video Editing</span>
                </div>
            </div>
        </section>
        ''',
        "show_cta": True
    },
    "pricing.html": {
        "title": "Pricing & Packages",
        "prefix": "",
        "content": '''
        <section class="py-20 px-6 container mx-auto">
            <h1 class="text-4xl font-bold mb-12 text-center">Pricing & Packages</h1>
            
            <div class="grid md:grid-cols-3 gap-8">
                <!-- Basic -->
                <div class="bg-blue p-8 rounded-xl border border-gray-700">
                    <h3 class="text-2xl font-bold mb-2">Basic</h3>
                    <div class="text-gold text-4xl font-bold mb-6">Starter</div>
                    <ul class="space-y-3 text-gray-400 mb-8">
                        <li><i class="fas fa-check text-green-500 mr-2"></i> Standard Delivery</li>
                        <li><i class="fas fa-check text-green-500 mr-2"></i> 1 Round of Revisions</li>
                        <li><i class="fas fa-check text-green-500 mr-2"></i> Basic Support</li>
                    </ul>
                    <a href="contact.html?type=quote" class="btn-secondary w-full block text-center">Request Quote</a>
                </div>
                <!-- Standard -->
                <div class="bg-navy p-8 rounded-xl border-2 border-gold transform scale-105 shadow-2xl shadow-gold/20">
                    <h3 class="text-2xl font-bold mb-2">Standard</h3>
                    <div class="text-gold text-4xl font-bold mb-6">Popular</div>
                    <ul class="space-y-3 text-gray-400 mb-8">
                        <li><i class="fas fa-check text-green-500 mr-2"></i> Priority Delivery</li>
                        <li><i class="fas fa-check text-green-500 mr-2"></i> 3 Rounds of Revisions</li>
                        <li><i class="fas fa-check text-green-500 mr-2"></i> Dedicated Support</li>
                        <li><i class="fas fa-check text-green-500 mr-2"></i> Source Files</li>
                    </ul>
                    <a href="contact.html?type=quote" class="btn-primary w-full block text-center">Request Quote</a>
                </div>
                <!-- Premium -->
                <div class="bg-blue p-8 rounded-xl border border-gray-700">
                    <h3 class="text-2xl font-bold mb-2">Premium</h3>
                    <div class="text-gold text-4xl font-bold mb-6">Enterprise</div>
                    <ul class="space-y-3 text-gray-400 mb-8">
                        <li><i class="fas fa-check text-green-500 mr-2"></i> Express Delivery</li>
                        <li><i class="fas fa-check text-green-500 mr-2"></i> Unlimited Revisions</li>
                        <li><i class="fas fa-check text-green-500 mr-2"></i> 24/7 Priority Support</li>
                        <li><i class="fas fa-check text-green-500 mr-2"></i> Full Rights & Source</li>
                    </ul>
                    <a href="contact.html?type=quote" class="btn-secondary w-full block text-center">Request Quote</a>
                </div>
            </div>
        </section>
        ''',
        "show_cta": False
    },
    "contact.html": {
        "title": "Contact Us",
        "prefix": "",
        "content": '''
        <section class="py-20 px-6 container mx-auto">
            <div class="grid md:grid-cols-2 gap-12">
                <div>
                    <h1 class="text-4xl font-bold mb-6">Get in Touch</h1>
                    <p class="text-gray-400 mb-8">Ready to start your next project? Fill out the form and our team will get back to you within 24 hours.</p>
                    
                    <div class="space-y-6">
                        <div class="flex items-start">
                            <div class="bg-blue p-4 rounded-full text-gold mr-4"><i class="fas fa-envelope text-xl"></i></div>
                            <div>
                                <h4 class="font-bold text-lg">Email Us</h4>
                                <p class="text-gray-400">hello@studio.com</p>
                            </div>
                        </div>
                        <div class="flex items-start">
                            <div class="bg-blue p-4 rounded-full text-gold mr-4"><i class="fab fa-whatsapp text-xl"></i></div>
                            <div>
                                <h4 class="font-bold text-lg">Call / WhatsApp</h4>
                                <p class="text-gray-400">+1 (234) 567-890</p>
                            </div>
                        </div>
                        <div class="flex items-start">
                            <div class="bg-blue p-4 rounded-full text-gold mr-4"><i class="fas fa-clock text-xl"></i></div>
                            <div>
                                <h4 class="font-bold text-lg">Business Hours</h4>
                                <p class="text-gray-400">Mon-Fri: 9am - 6pm EST</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="bg-blue p-8 rounded-xl shadow-lg">
                    <form onsubmit="event.preventDefault(); alert('Thanks! We will reply within 24 hours.');">
                        <div class="mb-4">
                            <label class="block text-sm font-bold mb-2">Full Name *</label>
                            <input type="text" required class="w-full bg-navy border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold">
                        </div>
                        <div class="mb-4">
                            <label class="block text-sm font-bold mb-2">Email Address *</label>
                            <input type="email" required class="w-full bg-navy border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold">
                        </div>
                        <div class="mb-4">
                            <label class="block text-sm font-bold mb-2">Service Interested In *</label>
                            <select required class="w-full bg-navy border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold">
                                <option>WordPress Development</option>
                                <option>Data Entry</option>
                                <option>Video Editing</option>
                                <option>AI Creation</option>
                                <option>Other</option>
                            </select>
                        </div>
                        <div class="mb-6">
                            <label class="block text-sm font-bold mb-2">Project Details / Message *</label>
                            <textarea rows="4" required class="w-full bg-navy border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold"></textarea>
                        </div>
                        <button type="submit" class="btn-primary w-full">Send Message</button>
                    </form>
                </div>
            </div>
        </section>
        ''',
        "show_cta": False
    },
    "services/wordpress.html": {
        "title": "WordPress Development",
        "prefix": "../",
        "content": '''
        <section class="py-20 px-6 bg-blue text-center">
            <h1 class="text-4xl md:text-5xl font-bold mb-6">WordPress Website Development</h1>
            <p class="text-xl text-gray-400 max-w-2xl mx-auto mb-8">From a blank domain to a fully functional, mobile-friendly WordPress website.</p>
        </section>
        <section class="py-16 px-6 container mx-auto">
            <h2 class="text-3xl font-bold mb-8 text-center">What's Included</h2>
            <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                <div class="bg-blue p-6 rounded-lg text-center"><i class="fas fa-mobile-alt text-gold text-3xl mb-4"></i><h4 class="font-bold">Fully Responsive</h4></div>
                <div class="bg-blue p-6 rounded-lg text-center"><i class="fas fa-map-marked-alt text-gold text-3xl mb-4"></i><h4 class="font-bold">Contact & Maps</h4></div>
                <div class="bg-blue p-6 rounded-lg text-center"><i class="fas fa-search text-gold text-3xl mb-4"></i><h4 class="font-bold">Basic SEO</h4></div>
                <div class="bg-blue p-6 rounded-lg text-center"><i class="fas fa-headset text-gold text-3xl mb-4"></i><h4 class="font-bold">7 Days Support</h4></div>
            </div>
        </section>
        ''',
        "show_cta": True
    },
    "services/data-entry.html": {
        "title": "Professional Data Entry",
        "prefix": "../",
        "content": '''
        <section class="py-20 px-6 bg-blue text-center">
            <h1 class="text-4xl md:text-5xl font-bold mb-6">Professional Data Entry</h1>
            <p class="text-xl text-gray-400 max-w-2xl mx-auto mb-8">Accurate, fast, and confidential data handling for businesses of any size.</p>
        </section>
        <section class="py-16 px-6 container mx-auto">
            <h2 class="text-3xl font-bold mb-8 text-center">What's Included</h2>
            <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                <div class="bg-blue p-6 rounded-lg text-center"><i class="fas fa-table text-gold text-3xl mb-4"></i><h4 class="font-bold">Structured Data</h4></div>
                <div class="bg-blue p-6 rounded-lg text-center"><i class="fas fa-check-double text-gold text-3xl mb-4"></i><h4 class="font-bold">Error-Checked</h4></div>
                <div class="bg-blue p-6 rounded-lg text-center"><i class="fas fa-lock text-gold text-3xl mb-4"></i><h4 class="font-bold">Confidential (NDA)</h4></div>
                <div class="bg-blue p-6 rounded-lg text-center"><i class="fas fa-bolt text-gold text-3xl mb-4"></i><h4 class="font-bold">Fast Turnaround</h4></div>
            </div>
        </section>
        ''',
        "show_cta": True
    },
    "services/video-editing.html": {
        "title": "Video Editing & Post-Production",
        "prefix": "../",
        "content": '''
        <section class="py-20 px-6 bg-blue text-center">
            <h1 class="text-4xl md:text-5xl font-bold mb-6">Video Editing & Post-Production</h1>
            <p class="text-xl text-gray-400 max-w-2xl mx-auto mb-8">Polished, professional edits for social media, ads, and long-form content.</p>
        </section>
        <section class="py-16 px-6 container mx-auto">
            <h2 class="text-3xl font-bold mb-8 text-center">What's Included</h2>
            <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                <div class="bg-blue p-6 rounded-lg text-center"><i class="fas fa-palette text-gold text-3xl mb-4"></i><h4 class="font-bold">Color Graded</h4></div>
                <div class="bg-blue p-6 rounded-lg text-center"><i class="fas fa-closed-captioning text-gold text-3xl mb-4"></i><h4 class="font-bold">Captions/Subtitles</h4></div>
                <div class="bg-blue p-6 rounded-lg text-center"><i class="fas fa-expand text-gold text-3xl mb-4"></i><h4 class="font-bold">Multiple Formats</h4></div>
                <div class="bg-blue p-6 rounded-lg text-center"><i class="fas fa-music text-gold text-3xl mb-4"></i><h4 class="font-bold">Royalty-Free Music</h4></div>
            </div>
        </section>
        ''',
        "show_cta": True
    },
    "services/ai-creation.html": {
        "title": "AI Content & Image Creation",
        "prefix": "../",
        "content": '''
        <section class="py-20 px-6 bg-blue text-center">
            <h1 class="text-4xl md:text-5xl font-bold mb-6">AI Content & Image Creation</h1>
            <p class="text-xl text-gray-400 max-w-2xl mx-auto mb-8">AI-generated images, graphics, and content tailored to your brand.</p>
        </section>
        <section class="py-16 px-6 container mx-auto">
            <h2 class="text-3xl font-bold mb-8 text-center">What's Included</h2>
            <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                <div class="bg-blue p-6 rounded-lg text-center"><i class="fas fa-image text-gold text-3xl mb-4"></i><h4 class="font-bold">Hi-Res AI Images</h4></div>
                <div class="bg-blue p-6 rounded-lg text-center"><i class="fas fa-layer-group text-gold text-3xl mb-4"></i><h4 class="font-bold">Multiple Variations</h4></div>
                <div class="bg-blue p-6 rounded-lg text-center"><i class="fas fa-file-export text-gold text-3xl mb-4"></i><h4 class="font-bold">Print-Ready Exports</h4></div>
                <div class="bg-blue p-6 rounded-lg text-center"><i class="fas fa-balance-scale text-gold text-3xl mb-4"></i><h4 class="font-bold">Usage Guidance</h4></div>
            </div>
        </section>
        ''',
        "show_cta": True
    }
}

for filename, data in PAGES.items():
    html = HEADER.format(title=data["title"], prefix=data["prefix"])
    
    # Optional Top CTA for service pages
    if filename.startswith("services/"):
        html += UNIVERSAL_CTA.format(prefix=data["prefix"])
        
    html += data["content"]
    
    if data["show_cta"]:
        html += UNIVERSAL_CTA.format(prefix=data["prefix"])
        
    html += FOOTER.format(prefix=data["prefix"], cta_block="")
    
    with open(os.path.join(r"c:\Users\Zia Ur Rehman\Desktop\website", filename), "w", encoding="utf-8") as f:
        f.write(html)

print("Site scaffolding complete.")
