// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.feature-card, .phase-card, .nav-card, .activity-section, .role-card, .practice-category');
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});

// Scroll to top button
const scrollTopBtn = document.createElement('button');
scrollTopBtn.className = 'scroll-top';
scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollTopBtn.title = 'Voltar ao topo';
document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Active navigation highlight
const currentLocation = location.pathname.split('/').pop() || 'index.html';
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
    const linkPath = link.getAttribute('href');
    if (linkPath === currentLocation || (currentLocation === '' && linkPath === 'index.html')) {
        link.classList.add('active');
    } else {
        link.classList.remove('active');
    }
});

// Mermaid diagram configuration
if (typeof mermaid !== 'undefined') {
    mermaid.initialize({
        startOnLoad: true,
        theme: 'default',
        flowchart: {
            useMaxWidth: true,
            htmlLabels: true,
            curve: 'basis'
        }
    });
}

// Team size calculator for roles (if on papeis.html)
if (document.getElementById('team-calculator')) {
    const teamSizeInput = document.getElementById('team-size');
    const calculateBtn = document.getElementById('calculate-roles');
    const resultDiv = document.getElementById('role-distribution');

    calculateBtn.addEventListener('click', () => {
        const teamSize = parseInt(teamSizeInput.value);
        if (teamSize < 2 || teamSize > 20) {
            resultDiv.innerHTML = '<p class="error">Por favor, insira um tamanho de equipe entre 2 e 20 pessoas.</p>';
            return;
        }

        let distribution = calculateRoleDistribution(teamSize);
        displayRoleDistribution(distribution, teamSize);
    });

    function calculateRoleDistribution(size) {
        let developers = Math.max(1, size - 2);
        let coaches = Math.min(2, Math.ceil(size / 5));
        let customers = 1;

        // Adjust if team is very small
        if (size <= 3) {
            developers = size - 1;
            coaches = 1;
            customers = 1;
        }

        return { developers, coaches, customers };
    }

    function displayRoleDistribution(distribution, totalSize) {
        resultDiv.innerHTML = `
            <div class="role-distribution-result">
                <h3>Distribuição Recomendada para ${totalSize} pessoas:</h3>
                <div class="distribution-grid">
                    <div class="distribution-item">
                        <i class="fas fa-user-tie"></i>
                        <h4>Coach</h4>
                        <span class="count">${distribution.coaches}</span>
                        <p>Facilita o processo e remove impedimentos</p>
                    </div>
                    <div class="distribution-item">
                        <i class="fas fa-users"></i>
                        <h4>Customer</h4>
                        <span class="count">${distribution.customers}</span>
                        <p>Define e valida os requisitos</p>
                    </div>
                    <div class="distribution-item">
                        <i class="fas fa-code"></i>
                        <h4>Developers</h4>
                        <span class="count">${distribution.developers}</span>
                        <p>Implementam e testam o software</p>
                    </div>
                </div>
                <div class="distribution-note">
                    <p><strong>Nota:</strong> Em equipes pequenas (≤3 pessoas), alguns membros podem assumir múltiplos papéis.</p>
                </div>
            </div>
        `;
    }
}

// Practice filter functionality (if on praticas.html)
if (document.querySelector('.practice-filters')) {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const practiceCategories = document.querySelectorAll('.practice-category');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Filter categories
            practiceCategories.forEach(category => {
                if (filter === 'all' || category.classList.contains(filter)) {
                    category.style.display = 'block';
                    category.classList.add('fade-in');
                } else {
                    category.style.display = 'none';
                }
            });
        });
    });
}

// Copy to clipboard functionality for code examples
document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const codeBlock = btn.nextElementSibling;
        const text = codeBlock.textContent;
        
        navigator.clipboard.writeText(text).then(() => {
            btn.innerHTML = '<i class="fas fa-check"></i> Copiado!';
            setTimeout(() => {
                btn.innerHTML = '<i class="fas fa-copy"></i> Copiar';
            }, 2000);
        });
    });
});

// Search functionality (if search input exists)
const searchInput = document.querySelector('.search-input');
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const searchableElements = document.querySelectorAll('.activity-item, .practice-item, .role-card');
        
        searchableElements.forEach(element => {
            const text = element.textContent.toLowerCase();
            if (text.includes(searchTerm)) {
                element.style.display = 'block';
                element.classList.add('highlight');
            } else {
                element.style.display = 'none';
                element.classList.remove('highlight');
            }
        });
    });
}

// Tooltip functionality
document.querySelectorAll('[data-tooltip]').forEach(element => {
    element.addEventListener('mouseenter', (e) => {
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = e.target.getAttribute('data-tooltip');
        document.body.appendChild(tooltip);

        const rect = e.target.getBoundingClientRect();
        tooltip.style.left = rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + 'px';
        tooltip.style.top = rect.top - tooltip.offsetHeight - 5 + 'px';
    });

    element.addEventListener('mouseleave', () => {
        const tooltip = document.querySelector('.tooltip');
        if (tooltip) {
            tooltip.remove();
        }
    });
});

// Print functionality
function printPage() {
    window.print();
}

// Export to PDF functionality (basic)
function exportToPDF() {
    window.print();
}

// Dark mode toggle (optional feature)
const darkModeToggle = document.querySelector('.dark-mode-toggle');
if (darkModeToggle) {
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
    });

    // Load saved dark mode preference
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }
}

// Performance optimization: Lazy loading for images
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
});
