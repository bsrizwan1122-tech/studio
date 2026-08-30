const fs = require('fs');

const files = [
    'apply-wordpress.html',
    'apply-data-entry.html',
    'apply-video-editing.html',
    'apply-ai-creation.html'
];

files.forEach(file => {
    try {
        let content = fs.readFileSync(file, 'utf8');
        
        // Ensure we haven't already fixed it
        if (content.includes('flex items-center justify-center p-6')) {
            // 1. Change body from row flex to column flex
            content = content.replace(
                '<body class="bg-navy text-gray-100 font-sans antialiased min-h-screen flex items-center justify-center p-6">',
                '<body class="bg-navy text-gray-100 font-sans antialiased min-h-screen flex flex-col">'
            );
            
            // 2. Add a flex-grow wrapper around the main form content so it pushes footer down
            content = content.replace(
                '<div class="w-full max-w-2xl">',
                '<div class="flex-grow flex items-center justify-center w-full p-6">\n    <div class="w-full max-w-2xl">'
            );
            
            // 3. Close the new wrapper div right before the footer
            content = content.replace(
                '<!-- Footer -->',
                '</div>\n    <!-- Footer -->'
            );
            
            fs.writeFileSync(file, content);
            console.log('Fixed layout for: ' + file);
        } else {
            console.log('Already fixed or class not found: ' + file);
        }
    } catch (e) {
        console.error('Error on ' + file + ':', e.message);
    }
});
