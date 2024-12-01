document.addEventListener('DOMContentLoaded', () => {
    // Prevent multiple initializations
    if (window.windyInitialized) return;

    const urlParams = new URLSearchParams(window.location.search);
    const currentOverlay = urlParams.get('overlay') || 'wind';
    let windyInstance = null;
    
    const layerSelect = document.getElementById('layer-select');
    const loadingIndicator = document.getElementById('loading');

    // Debounce function
    const debounce = (func, wait) => {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    };

    // Handle overlay change without page reload
    const handleOverlayChange = (newOverlay) => {
        if (!windyInstance) return;
        
        try {
            const { store } = windyInstance;
            if (store && store.set) {
                store.set('overlay', newOverlay);
                
                // Update URL without page reload
                const newUrl = new URL(window.location);
                newUrl.searchParams.set('overlay', newOverlay);
                window.history.pushState({}, '', newUrl);
            }
        } catch (error) {
            console.error('Error changing overlay:', error);
        }
    };

    // Single initialization function
    const initializeWindy = async () => {
        if (window.windyInitialized) return;

        try {
            // Check if we already have a cached API key
            let apiKey = sessionStorage.getItem('windyApiKey');
            
            if (!apiKey) {
                const response = await fetch('/api/windy-key');
                if (!response.ok) throw new Error('Failed to fetch API key');
                const data = await response.json();
                apiKey = data.key;
                sessionStorage.setItem('windyApiKey', apiKey);
            }

            const options = {
                key: apiKey,
                verbose: false,
                lat: 20.5937,
                lon: 78.9629,
                zoom: 5,
                overlay: currentOverlay,
                // Correct product setting
                product: 'gfs',
                level: 'surface',
                timestamp: Math.floor(Date.now() / 3600000) * 3600000,
                // Add required parameters
                hourFormat: '12h',
                graticule: false,
                particlesAnim: false,
                theme: 'dark'
            };

            return new Promise((resolve) => {
                windyInit(options, (api) => {
                    window.windyInitialized = true;
                    windyInstance = api;
                    
                    const { store, map, picker } = api;

                    // Set initial overlay
                    if (store && store.set) {
                        store.set('overlay', currentOverlay);
                    }

                    // Configure map settings
                    if (map) {
                        map.setMinZoom(4);
                        map.setMaxZoom(10);
                        
                        // Add click handler with debounce
                        const debouncedClick = debounce((e) => {
                            if (picker && picker.open) {
                                const { lat, lng } = e.latlng;
                                picker.open({ lat: lat, lon: lng });
                            }
                        }, 500);

                        map.on('click', debouncedClick);
                    }

                    if (loadingIndicator) {
                        loadingIndicator.style.display = 'none';
                    }

                    resolve(api);
                });
            });
        } catch (error) {
            console.error('Initialization error:', error);
            if (loadingIndicator) {
                loadingIndicator.style.display = 'none';
            }
        }
    };

    // Setup event listeners
    if (layerSelect) {
        layerSelect.value = currentOverlay;
        
        // Debounced change handler
        const debouncedChange = debounce((e) => {
            handleOverlayChange(e.target.value);
        }, 500);

        layerSelect.addEventListener('change', debouncedChange);
    }

    // Initialize once
    initializeWindy().catch(error => {
        console.error('Failed to initialize Windy:', error);
    });
});
