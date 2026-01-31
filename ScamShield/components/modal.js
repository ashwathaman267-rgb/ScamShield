// Modal Component

class Modal {
    constructor() {
        this.container = document.getElementById('modal-container');
        if (!this.container) {
            this.container = document.createElement('div');
            this.container.id = 'modal-container';
            document.body.appendChild(this.container);
        }
    }

    show(options = {}) {
        const {
            title = '',
            content = '',
            footer = '',
            className = '',
            onClose = null,
            closeOnBackdrop = true
        } = options;

        const modal = this.createModal(title, content, footer, className);
        this.container.innerHTML = '';
        this.container.appendChild(modal);
        this.container.style.display = 'flex';
        document.body.style.overflow = 'hidden';

        // Animate in
        setTimeout(() => {
            modal.classList.add('modal-active');
        }, 10);

        // Setup close handlers
        const closeBtn = modal.querySelector('.modal-close');
        const backdrop = modal.querySelector('.modal-backdrop');

        const closeModal = () => {
            this.close();
            if (onClose) onClose();
        };

        if (closeBtn) {
            closeBtn.addEventListener('click', closeModal);
        }

        if (closeOnBackdrop && backdrop) {
            backdrop.addEventListener('click', (e) => {
                if (e.target === backdrop) {
                    closeModal();
                }
            });
        }

        // ESC key handler
        const handleEsc = (e) => {
            if (e.key === 'Escape') {
                closeModal();
                document.removeEventListener('keydown', handleEsc);
            }
        };
        document.addEventListener('keydown', handleEsc);

        return modal;
    }

    createModal(title, content, footer, className) {
        const modal = document.createElement('div');
        modal.className = `modal ${className}`.trim();

        modal.innerHTML = `
            <div class="modal-backdrop"></div>
            <div class="modal-content">
                <div class="modal-header">
                    <h2 class="modal-title">${title}</h2>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    ${typeof content === 'string' ? content : ''}
                </div>
                ${footer ? `<div class="modal-footer">${footer}</div>` : ''}
            </div>
        `;

        if (content instanceof Node) {
            const body = modal.querySelector('.modal-body');
            body.innerHTML = '';
            body.appendChild(content);
        }

        return modal;
    }

    close() {
        const modal = this.container.querySelector('.modal');
        if (modal) {
            modal.classList.remove('modal-active');
            setTimeout(() => {
                this.container.style.display = 'none';
                this.container.innerHTML = '';
                document.body.style.overflow = '';
            }, 300);
        }
    }
}

// Modal styles
const modalStyles = `
#modal-container {
    position: fixed;
    inset: 0;
    z-index: 10000;
    display: none;
    align-items: center;
    justify-content: center;
    padding: 1rem;
}

.modal-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    opacity: 0;
    transition: opacity var(--transition-base);
}

.modal {
    position: relative;
    z-index: 1;
}

.modal-active .modal-backdrop {
    opacity: 1;
}

.modal-content {
    background: var(--bg-primary);
    border-radius: var(--radius-xl);
    max-width: 600px;
    width: 100%;
    max-height: 90vh;
    overflow: hidden;
    box-shadow: var(--shadow-xl);
    transform: scale(0.9) translateY(-20px);
    opacity: 0;
    transition: all var(--transition-base);
}

.modal-active .modal-content {
    transform: scale(1) translateY(0);
    opacity: 1;
}

.modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.5rem;
    border-bottom: 1px solid var(--border-color);
}

.modal-title {
    font-size: 1.5rem;
    font-weight: 700;
    margin: 0;
}

.modal-close {
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: none;
    border: none;
    font-size: 1.5rem;
    color: var(--text-secondary);
    cursor: pointer;
    border-radius: var(--radius-md);
    transition: all var(--transition-fast);
}

.modal-close:hover {
    background: var(--bg-secondary);
    color: var(--text-primary);
}

.modal-body {
    padding: 1.5rem;
    overflow-y: auto;
    max-height: calc(90vh - 200px);
}

.modal-footer {
    padding: 1.5rem;
    border-top: 1px solid var(--border-color);
    display: flex;
    gap: 0.75rem;
    justify-content: flex-end;
}
`;

if (!document.getElementById('modal-styles')) {
    const style = document.createElement('style');
    style.id = 'modal-styles';
    style.textContent = modalStyles;
    document.head.appendChild(style);
}

window.modal = new Modal();
