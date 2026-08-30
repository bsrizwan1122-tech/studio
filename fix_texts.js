const fs = require('fs');
const path = require('path');

const serviceFiles = [
    'services/wordpress.html',
    'services/data-entry.html',
    'services/video-editing.html',
    'services/ai-creation.html',
    'index.html'
];

serviceFiles.forEach(file => {
    try {
        let content = fs.readFileSync(file, 'utf8');
        content = content.replace(/>Apply For This Course</g, '>Get Order<');
        content = content.replace(/>Apply For a Course</g, '>Get Order<');
        fs.writeFileSync(file, content);
        console.log('Fixed buttons in: ' + file);
    } catch (e) {
        console.error('Error on ' + file, e.message);
    }
});

const applyFiles = [
    'apply-wordpress.html',
    'apply-data-entry.html',
    'apply-video-editing.html',
    'apply-ai-creation.html'
];

applyFiles.forEach(file => {
    try {
        let content = fs.readFileSync(file, 'utf8');
        // Remove the Course field block entirely
        const courseBlockRegex = /<div class="mb-6">\s*<label class="block text-sm font-bold mb-2 text-gray-300">Course<\/label>[\s\S]*?<\/div>\s*/;
        content = content.replace(courseBlockRegex, '');
        
        // Change references to Course
        content = content.replace(/Back to Course/g, 'Back to Service');
        content = content.replace(/Course Application/g, 'Order Service');
        content = content.replace(/join this course/g, 'need this service');
        
        fs.writeFileSync(file, content);
        console.log('Fixed form in: ' + file);
    } catch (e) {
        console.error('Error on ' + file, e.message);
    }
});
