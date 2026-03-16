// Search functionality for Japan Resource Group website
class SearchSystem {
    constructor() {
        this.searchModal = null;
        this.searchInput = null;
        this.searchResults = null;
        this.isOpen = false;
        this.searchData = [];
        this.init();
    }

    init() {
        this.createSearchModal();
        this.attachEventListeners();
        this.loadSearchData();
    }

    createSearchModal() {
        // Create search modal HTML
        const modalHTML = `
            <div id="search-modal" class="search-modal">
                <div class="search-modal-overlay"></div>
                <div class="search-modal-content">
                    <div class="search-header">
                        <div class="search-input-container">
                            <i class="fas fa-search search-icon"></i>
                            <input type="text" id="search-input" placeholder="Search services, content, and more..." autocomplete="off">
                            <button class="search-clear" id="search-clear">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                        <button class="search-close" id="search-close">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="search-results" id="search-results">
                        <div class="search-suggestions">
                            <h4>Popular Searches</h4>
                            <div class="suggestion-tags">
                                <span class="suggestion-tag" data-search="ocean transportation">Ocean Transportation</span>
                                <span class="suggestion-tag" data-search="land transportation">Land Transportation</span>
                                <span class="suggestion-tag" data-search="supply chain">Supply Chain Management</span>
                                <span class="suggestion-tag" data-search="custom clearance">Custom Clearance</span>
                                <span class="suggestion-tag" data-search="yard services">Yard Services</span>
                                <span class="suggestion-tag" data-search="logistics">Logistics</span>
                                <span class="suggestion-tag" data-search="shipping">Shipping</span>
                                <span class="suggestion-tag" data-search="contact">Contact</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Add modal to body
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        // Get references
        this.searchModal = document.getElementById('search-modal');
        this.searchInput = document.getElementById('search-input');
        this.searchResults = document.getElementById('search-results');
    }

    attachEventListeners() {
        // Search icon click events
        document.addEventListener('click', (e) => {
            if (e.target.closest('.fa-search') && !e.target.closest('.search-modal')) {
                e.preventDefault();
                this.openSearch();
            }
        });

        // Close search events
        document.addEventListener('click', (e) => {
            if (e.target.id === 'search-close' || e.target.closest('.search-modal-overlay')) {
                this.closeSearch();
            }
        });

        // Search input events
        if (this.searchInput) {
            this.searchInput.addEventListener('input', (e) => {
                this.handleSearch(e.target.value);
            });

            this.searchInput.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    this.closeSearch();
                }
            });
        }

        // Clear search button
        const clearBtn = document.getElementById('search-clear');
        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                this.searchInput.value = '';
                this.showSuggestions();
                this.searchInput.focus();
            });
        }

        // Suggestion tag clicks
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('suggestion-tag')) {
                const searchTerm = e.target.getAttribute('data-search');
                this.searchInput.value = searchTerm;
                this.handleSearch(searchTerm);
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === '/' && !this.isOpen) {
                e.preventDefault();
                this.openSearch();
            }
        });
    }

    loadSearchData() {
        // Define searchable content across all pages
        this.searchData = [
            // Home page content
            {
                title: "Ocean Transportation",
                description: "Reliable ocean freight services connecting global markets",
                url: "ocean_transportation.html",
                keywords: ["ocean", "transportation", "shipping", "freight", "sea", "cargo", "vessel", "container"],
                category: "Services"
            },
            {
                title: "Land Transportation",
                description: "Efficient land-based logistics and transportation solutions",
                url: "land_transportation.html",
                keywords: ["land", "transportation", "truck", "road", "logistics", "delivery", "freight"],
                category: "Services"
            },
            {
                title: "Supply Chain Management",
                description: "Comprehensive supply chain optimization and management",
                url: "supply_chain_management.html",
                keywords: ["supply", "chain", "management", "logistics", "optimization", "warehouse", "inventory"],
                category: "Services"
            },
            {
                title: "Custom Clearance",
                description: "Expert customs clearance and documentation services",
                url: "custom_clearance.html",
                keywords: ["custom", "clearance", "customs", "documentation", "import", "export", "compliance"],
                category: "Services"
            },
            {
                title: "Yard Services",
                description: "Professional yard operations and container handling",
                url: "yard_services.html",
                keywords: ["yard", "services", "container", "handling", "storage", "operations"],
                category: "Services"
            },
            {
                title: "About Us",
                description: "Learn about Japan Resource Group's mission and expertise",
                url: "about.html",
                keywords: ["about", "company", "mission", "team", "expertise", "history", "profile"],
                category: "Company"
            },
            {
                title: "Contact Us",
                description: "Get in touch with our logistics experts",
                url: "contact.html",
                keywords: ["contact", "phone", "email", "address", "support", "inquiry", "help"],
                category: "Company"
            },
            {
                title: "Marketing Department",
                description: "Led by Junaid Khan, focuses on promoting Japan Resource Group's services",
                url: "index.html#departments",
                keywords: ["marketing", "department", "junaid", "khan", "promotion", "branding"],
                category: "Departments"
            },
            {
                title: "Transport Department",
                description: "Headed by Shiraz, manages land and ocean transportation",
                url: "index.html#departments",
                keywords: ["transport", "department", "shiraz", "logistics", "shipping"],
                category: "Departments"
            },
            {
                title: "Booking Department",
                description: "Handles cargo reservations and shipment scheduling",
                url: "index.html#departments",
                keywords: ["booking", "department", "reservation", "scheduling", "cargo"],
                category: "Departments"
            },
            {
                title: "Operation Department",
                description: "Managed by Junaid Khan, responsible for day-to-day logistics execution",
                url: "index.html#departments",
                keywords: ["operation", "department", "execution", "logistics", "daily"],
                category: "Departments"
            },
            {
                title: "Shipping Partners",
                description: "Our trusted partnerships with world-leading shipping lines",
                url: "index.html#partners",
                keywords: ["shipping", "partners", "maersk", "hapag", "oocl", "msc", "cma", "sitc"],
                category: "Partners"
            },
            {
                title: "Global Network",
                description: "Connect with our worldwide logistics network",
                url: "contact.html",
                keywords: ["global", "network", "worldwide", "international", "connect"],
                category: "Company"
            },
            {
                title: "Japan Resource Group",
                description: "Leading logistics and transportation service provider",
                url: "about.html",
                keywords: ["japan", "resource", "group", "logistics", "transportation", "company"],
                category: "Company"
            },
            {
                title: "Cargo Security",
                description: "Advanced cargo security and tracking systems",
                url: "ocean_transportation.html",
                keywords: ["cargo", "security", "tracking", "safety", "protection"],
                category: "Services"
            },
            {
                title: "Documentation Services",
                description: "Comprehensive documentation and customs clearance",
                url: "custom_clearance.html",
                keywords: ["documentation", "customs", "clearance", "paperwork", "compliance"],
                category: "Services"
            },
            {
                title: "Container Handling",
                description: "Professional container handling and yard operations",
                url: "yard_services.html",
                keywords: ["container", "handling", "yard", "operations", "storage"],
                category: "Services"
            },
            {
                title: "Supply Chain Optimization",
                description: "End-to-end supply chain management and optimization",
                url: "supply_chain_management.html",
                keywords: ["supply", "chain", "optimization", "management", "efficiency"],
                category: "Services"
            },
            {
                title: "Road Transportation",
                description: "Efficient land-based transportation solutions",
                url: "land_transportation.html",
                keywords: ["road", "truck", "land", "transportation", "delivery"],
                category: "Services"
            }
        ];
    }

    openSearch() {
        this.isOpen = true;
        this.searchModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Focus on search input after animation
        setTimeout(() => {
            this.searchInput.focus();
        }, 100);
        
        // Show suggestions initially
        this.showSuggestions();
    }

    closeSearch() {
        this.isOpen = false;
        this.searchModal.style.display = 'none';
        document.body.style.overflow = '';
        this.searchInput.value = '';
    }

    handleSearch(query) {
        if (!query.trim()) {
            this.showSuggestions();
            return;
        }

        const results = this.searchContent(query);
        this.displayResults(results);
    }

    searchContent(query) {
        const searchTerm = query.toLowerCase();
        const results = [];

        this.searchData.forEach(item => {
            let score = 0;
            
            // Check title match
            if (item.title.toLowerCase().includes(searchTerm)) {
                score += 10;
            }
            
            // Check description match
            if (item.description.toLowerCase().includes(searchTerm)) {
                score += 5;
            }
            
            // Check keywords match
            item.keywords.forEach(keyword => {
                if (keyword.toLowerCase().includes(searchTerm)) {
                    score += 3;
                }
            });

            if (score > 0) {
                results.push({ ...item, score });
            }
        });

        // Sort by score (highest first)
        return results.sort((a, b) => b.score - a.score);
    }

    displayResults(results) {
        if (results.length === 0) {
            this.searchResults.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search"></i>
                    <h4>No results found</h4>
                    <p>Try searching for "ocean transportation", "contact", or "services"</p>
                </div>
            `;
            return;
        }

        const resultsHTML = results.map(item => `
            <div class="search-result-item" data-url="${item.url}">
                <div class="result-content">
                    <h4 class="result-title">${this.highlightMatch(item.title, this.searchInput.value)}</h4>
                    <p class="result-description">${this.highlightMatch(item.description, this.searchInput.value)}</p>
                    <span class="result-category">${item.category}</span>
                </div>
                <div class="result-arrow">
                    <i class="fas fa-arrow-right"></i>
                </div>
            </div>
        `).join('');

        this.searchResults.innerHTML = `
            <div class="search-results-list">
                ${resultsHTML}
            </div>
        `;

        // Add click handlers to results
        this.searchResults.querySelectorAll('.search-result-item').forEach(item => {
            item.addEventListener('click', () => {
                const url = item.getAttribute('data-url');
                this.navigateToResult(url);
            });
        });
    }

    showSuggestions() {
        this.searchResults.innerHTML = `
            <div class="search-suggestions">
                <h4>Popular Searches</h4>
                <div class="suggestion-tags">
                    <span class="suggestion-tag" data-search="ocean transportation">Ocean Transportation</span>
                    <span class="suggestion-tag" data-search="land transportation">Land Transportation</span>
                    <span class="suggestion-tag" data-search="supply chain">Supply Chain Management</span>
                    <span class="suggestion-tag" data-search="custom clearance">Custom Clearance</span>
                    <span class="suggestion-tag" data-search="yard services">Yard Services</span>
                    <span class="suggestion-tag" data-search="logistics">Logistics</span>
                    <span class="suggestion-tag" data-search="shipping">Shipping</span>
                    <span class="suggestion-tag" data-search="contact">Contact</span>
                </div>
            </div>
        `;
    }

    highlightMatch(text, query) {
        if (!query) return text;
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<mark>$1</mark>');
    }

    navigateToResult(url) {
        this.closeSearch();
        if (url.startsWith('#')) {
            // Internal anchor link
            const target = document.querySelector(url);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            // External page
            window.location.href = url;
        }
    }
}

// Initialize search system when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    new SearchSystem();
});

// Add search modal CSS
const searchCSS = `
    .search-modal {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10000;
        align-items: flex-start;
        padding-top: 5vh;
    }

    .search-modal-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(5px);
    }

    .search-modal-content {
        position: relative;
        width: 90%;
        max-width: 800px;
        background: white;
        border-radius: 12px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        animation: searchModalSlideIn 0.3s ease-out;
        max-height: 80vh;
        overflow: hidden;
    }

    @keyframes searchModalSlideIn {
        from {
            opacity: 0;
            transform: translateY(-20px) scale(0.95);
        }
        to {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
    }

    .search-header {
        display: flex;
        align-items: center;
        padding: 20px;
        border-bottom: 1px solid #e5e7eb;
        gap: 15px;
    }

    .search-input-container {
        flex: 1;
        position: relative;
        display: flex;
        align-items: center;
    }

    .search-icon {
        position: absolute;
        left: 15px;
        color: #6b7280;
        font-size: 16px;
        z-index: 1;
    }

    #search-input {
        width: 100%;
        padding: 15px 15px 15px 45px;
        border: 2px solid #e5e7eb;
        border-radius: 8px;
        font-size: 16px;
        outline: none;
        transition: border-color 0.3s ease;
    }

    #search-input:focus {
        border-color: #0d96b1;
    }

    .search-clear {
        position: absolute;
        right: 15px;
        background: none;
        border: none;
        color: #6b7280;
        cursor: pointer;
        padding: 5px;
        border-radius: 4px;
        transition: color 0.3s ease;
    }

    .search-clear:hover {
        color: #374151;
    }

    .search-close {
        background: none;
        border: none;
        color: #6b7280;
        cursor: pointer;
        padding: 10px;
        border-radius: 8px;
        transition: all 0.3s ease;
        font-size: 18px;
    }

    .search-close:hover {
        background: #f3f4f6;
        color: #374151;
    }

    .search-results {
        max-height: 60vh;
        overflow-y: auto;
        padding: 20px;
    }

    .search-suggestions h4 {
        color: #374151;
        margin-bottom: 15px;
        font-size: 16px;
        font-weight: 600;
    }

    .suggestion-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
    }

    .suggestion-tag {
        background: #f3f4f6;
        color: #374151;
        padding: 8px 16px;
        border-radius: 20px;
        cursor: pointer;
        transition: all 0.3s ease;
        font-size: 14px;
        border: 1px solid transparent;
    }

    .suggestion-tag:hover {
        background: #0d96b1;
        color: white;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(13, 150, 177, 0.3);
    }

    .search-results-list {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .search-result-item {
        display: flex;
        align-items: center;
        padding: 15px;
        border: 1px solid #e5e7eb;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.3s ease;
        background: white;
    }

    .search-result-item:hover {
        border-color: #0d96b1;
        box-shadow: 0 4px 12px rgba(13, 150, 177, 0.1);
        transform: translateY(-2px);
    }

    .result-content {
        flex: 1;
    }

    .result-title {
        color: #111827;
        font-size: 16px;
        font-weight: 600;
        margin: 0 0 5px 0;
    }

    .result-description {
        color: #6b7280;
        font-size: 14px;
        margin: 0 0 8px 0;
        line-height: 1.4;
    }

    .result-category {
        background: #0d96b1;
        color: white;
        padding: 4px 8px;
        border-radius: 12px;
        font-size: 12px;
        font-weight: 500;
    }

    .result-arrow {
        color: #9ca3af;
        font-size: 14px;
        margin-left: 15px;
        transition: all 0.3s ease;
    }

    .search-result-item:hover .result-arrow {
        color: #0d96b1;
        transform: translateX(5px);
    }

    .no-results {
        text-align: center;
        padding: 40px 20px;
        color: #6b7280;
    }

    .no-results i {
        font-size: 48px;
        margin-bottom: 20px;
        color: #d1d5db;
    }

    .no-results h4 {
        margin: 0 0 10px 0;
        color: #374151;
    }

    .no-results p {
        margin: 0;
        font-size: 14px;
    }

    mark {
        background: #fbbf24;
        color: #111827;
        padding: 2px 4px;
        border-radius: 3px;
        font-weight: 600;
    }

    /* Mobile responsiveness */
    @media (max-width: 768px) {
        .search-modal {
            padding-top: 2vh;
        }

        .search-modal-content {
            width: 95%;
            margin: 0 auto;
        }

        .search-header {
            padding: 15px;
            flex-direction: column;
            gap: 10px;
        }

        .search-input-container {
            width: 100%;
        }

        .search-results {
            padding: 15px;
        }

        .suggestion-tags {
            gap: 8px;
        }

        .suggestion-tag {
            font-size: 13px;
            padding: 6px 12px;
        }
    }
`;

// Add CSS to head
const style = document.createElement('style');
style.textContent = searchCSS;
document.head.appendChild(style);
