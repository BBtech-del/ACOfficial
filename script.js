// ROI Calculator
document.addEventListener('DOMContentLoaded', function() {
    const employeeInput = document.getElementById('employees');
    const avacompliCostEl = document.getElementById('avacompli-cost');
    const currentCostEl = document.getElementById('current-cost');
    const savingsEl = document.getElementById('savings');

    function calculateROI() {
        const employees = parseInt(employeeInput.value) || 1000;
        
        // AVACompli cost: $15,000 per employee
        const avacompliCost = employees * 15000;
        
        // Industry average: $20,000 per employee
        const currentCost = employees * 20000;
        
        // Savings
        const savings = currentCost - avacompliCost;
        
        // Update display
        avacompliCostEl.textContent = formatCurrency(avacompliCost);
        currentCostEl.textContent = formatCurrency(currentCost);
        savingsEl.textContent = formatCurrency(savings);
    }

    function formatCurrency(amount) {
        return '$' + amount.toLocaleString('en-US');
    }

    // Update calculator on input
    if (employeeInput) {
        employeeInput.addEventListener('input', calculateROI);
        
        // Initial calculation
        calculateROI();
    }

    // Smooth scroll for navigation links
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

    // Form validation enhancement
    const form = document.querySelector('.apply-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            const complianceBudget = document.getElementById('complianceBudget').value;
            
            // Warn if budget is under $30M
            if (complianceBudget === 'under-30m') {
                const proceed = confirm('Your selected budget is below our typical minimum. We may not be able to accommodate your organization at this time. Would you still like to submit your application?');
                
                if (!proceed) {
                    e.preventDefault();
                }
            }
        });
    }

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all solution items and problem cards
    document.querySelectorAll('.solution-item, .problem-card, .criteria-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});
