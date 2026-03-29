/* =============================================
   PORTEFÓLIO — SCRIPT.JS
   Responsável por toda a interactividade do site:
   menu mobile, navbar scroll, animações reveal,
   contadores, filtro de projetos e validação de formulário.
   ============================================= */


/* =============================================
   MENU MOBILE
   ============================================= */

/* Abre/fecha o menu fullscreen adicionando/removendo a classe .open.
   Bloqueia o scroll da página quando o menu está aberto. */
function toggleMobileMenu() {
    document.getElementById("mobileMenu").classList.toggle("open");
    document.body.style.overflow =
        document.getElementById("mobileMenu").classList.contains("open") ? "hidden" : "";
}

/* Fecha o menu ao pressionar ESC — melhora acessibilidade por teclado */
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        document.getElementById("mobileMenu").classList.remove("open");
        document.body.style.overflow = "";
    }
});

/* Fecha o menu ao clicar num link (evita que o menu fique aberto durante a navegação) */
document.querySelectorAll(".mobile-menu a").forEach(link => {
    link.addEventListener("click", () => {
        document.getElementById("mobileMenu").classList.remove("open");
        document.body.style.overflow = "";
    });
});


/* =============================================
   EFEITO SCROLL NA NAVBAR
   ============================================= */

/* Adiciona a classe .scrolled após 50px de scroll, activando o efeito glassmorphism no CSS */
window.addEventListener("scroll", () => {
    const navbar = document.getElementById("navbar");
    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});


/* =============================================
   LINK ACTIVO NA NAVEGAÇÃO
   ============================================= */

/* Detecta o nome do ficheiro da página actual e marca o link correspondente como .active */
const currentPage = window.location.pathname.split("/").pop() || "index.html";
document.querySelectorAll(".nav-links a").forEach(link => {
    const href = link.getAttribute("href");
    if (href && href.includes(currentPage)) {
        link.classList.add("active");
    }
});


/* =============================================
   ANIMAÇÕES REVEAL — IntersectionObserver
   ============================================= */

/* Observa todos os elementos .reveal e adiciona .visible quando entram no viewport,
   com um delay escalonado entre elementos para um efeito de cascata */
function initRevealAnimations() {
    const revealElements = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add("visible");
                }, index * 80);         // 80ms de delay entre cada elemento
                observer.unobserve(entry.target);   // Para de observar após animar
            }
        });
    }, {
        threshold: 0.1,             // Activa quando 10% do elemento está visível
        rootMargin: "0px 0px -50px 0px" // Margem negativa: activa um pouco antes de sair do viewport
    });

    revealElements.forEach(el => observer.observe(el));
}

document.addEventListener("DOMContentLoaded", initRevealAnimations);


/* =============================================
   CONTADOR DE ESTATÍSTICAS ANIMADO
   ============================================= */

/* Anima um número de 0 até ao target num intervalo de ~16ms (≈60fps).
   O data-suffix é lido do HTML para adicionar o símbolo correcto ("+", "%" etc.) */
function animateCounter(element, target, duration = 1500) {
    let start = 0;
    const step = target / (duration / 16);

    const timer = setInterval(() => {
        start += step;
        if (start >= target) {
            element.textContent = target + (element.dataset.suffix || "");
            clearInterval(timer);   // Para o intervalo ao atingir o valor final
        } else {
            element.textContent = Math.floor(start) + (element.dataset.suffix || "");
        }
    }, 16);
}

/* Usa IntersectionObserver para iniciar o contador apenas quando
   a secção de stats entra no viewport */
function initCounters() {
    const counters = document.querySelectorAll(".stat-num[data-target]");
    if (counters.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.target);
                animateCounter(entry.target, target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });     // Activa quando 50% do elemento está visível

    counters.forEach(counter => observer.observe(counter));
}

document.addEventListener("DOMContentLoaded", initCounters);


/* =============================================
   FILTRO DE PROJETOS
   ============================================= */

/* Filtra os cards de projeto pelo data-category.
   Cards ocultos têm display:none; visíveis surgem com animação de fade+slide. */
function initProjectFilter() {
    const filterBtns = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".project-card[data-category]");

    if (filterBtns.length === 0) return;   // Sai se não estiver na página de projetos

    filterBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            // Actualiza o botão activo
            filterBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const filter = btn.dataset.filter;

            projectCards.forEach(card => {
                if (filter === "all" || card.dataset.category === filter) {
                    // Mostra o card com animação de entrada
                    card.style.display = "flex";
                    card.style.flexDirection = "column";
                    card.style.opacity = "0";
                    card.style.transform = "translateY(16px)";
                    setTimeout(() => {
                        card.style.transition = "opacity 0.4s ease, transform 0.4s ease";
                        card.style.opacity = "1";
                        card.style.transform = "translateY(0)";
                    }, 50);
                } else {
                    card.style.display = "none";
                }
            });
        });
    });
}

document.addEventListener("DOMContentLoaded", initProjectFilter);


/* =============================================
   VALIDAÇÃO DO FORMULÁRIO DE CONTACTO
   ============================================= */

function initContactForm() {
    const form = document.getElementById("contactForm");
    if (!form) return;  // Sai se não estiver na página de contacto

    /* Marca o campo como inválido e mostra a mensagem de erro correspondente */
    function showError(input, message) {
        input.classList.add("error");
        input.classList.remove("success");
        const errorEl = document.getElementById(input.id + "Error");
        if (errorEl) {
            errorEl.textContent = message;
            errorEl.classList.add("show");
        }
    }

    /* Marca o campo como válido e oculta a mensagem de erro */
    function showSuccess(input) {
        input.classList.remove("error");
        input.classList.add("success");
        const errorEl = document.getElementById(input.id + "Error");
        if (errorEl) errorEl.classList.remove("show");
    }

    /* Validação de email com expressão regular */
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    /* Valida um campo individualmente com regras específicas por tipo/id */
    function validateField(field) {
        const value = field.value.trim();

        if (field.required && value === "") {
            showError(field, "Este campo é obrigatório.");
            return false;
        }
        if (field.type === "email" && value !== "" && !isValidEmail(value)) {
            showError(field, "Por favor insere um email válido.");
            return false;
        }
        if (field.id === "nome" && value.length < 2) {
            showError(field, "O nome deve ter pelo menos 2 caracteres.");
            return false;
        }
        if (field.id === "mensagem" && value.length < 10) {
            showError(field, "A mensagem deve ter pelo menos 10 caracteres.");
            return false;
        }
        showSuccess(field);
        return true;
    }

    /* Valida em tempo real: no blur (ao sair do campo) e no input (enquanto escreve, se já tiver erro) */
    form.querySelectorAll(".form-input, .form-textarea").forEach(input => {
        input.addEventListener("blur", () => validateField(input));
        input.addEventListener("input", () => {
            if (input.classList.contains("error")) validateField(input);
        });
    });

    /* Submissão: previne o comportamento padrão, valida todos os campos obrigatórios
       e simula envio com feedback visual antes de mostrar a mensagem de sucesso */
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const fields = form.querySelectorAll(".form-input[required], .form-textarea[required]");
        let isValid = true;
        fields.forEach(field => { if (!validateField(field)) isValid = false; });

        if (isValid) {
            const submitBtn = form.querySelector("button[type='submit']");
            submitBtn.disabled = true;
            submitBtn.textContent = "A enviar...";
            setTimeout(() => {
                form.style.display = "none";
                const successMsg = document.getElementById("formSuccess");
                if (successMsg) successMsg.classList.add("show");
            }, 1200);
        }
    });
}

document.addEventListener("DOMContentLoaded", initContactForm);