import { Controller } from '@hotwired/stimulus';

export default class ToggleController extends Controller {
    static targets = ["element", "select", "checkbox", "radio"]

    connect() {
        this.initTargets();
    }

    initTargets() {
        [...this.selectTargets, ...this.checkboxTargets, ...this.radioTargets].forEach(target => {
            this.applyToggle(target);
            this.addAriaAttributes(target);
        });
    }

    changed(event) {
        this.applyToggle(event.target)
    }

    applyToggle(target) {
        const value = this.getTargetValue(target);
        const elements = this.findToggledElements(target);

        this.applyToggleToElements(elements, value);
        this.updateAriaExpanded(target, elements);
    }

    findToggledElements(target) {
        const toggleSet = target.dataset.toggleSet;

        return toggleSet
            ? this.elementTargets.filter(element => element.dataset.toggleSet.split(',').includes(toggleSet.trim()))
            : this.elementTargets;
    }

    applyToggleToElements(elements, value) {
        for (const element of elements) {
            this.toggle(element, value);
        }
    }

    toggle(element, value) {
        if (!element) {
            return;
        }

        const isVisible = element.dataset.values.split(',').includes(value);
        element.hidden = !isVisible;
        element.setAttribute('aria-hidden', !isVisible);
    }

    getTargetValue(target) {
        if (target.dataset.toggleTarget === 'checkbox') {
            return target.checked ? target.value : null;
        }

        if (target.dataset.toggleTarget === "radio") {
            return target.querySelector('input:checked')?.value;
        }

        return target.value;
    }

    addAriaAttributes(target) {
        const controls = this.findToggledElements(target).map(element => {
            if (!element.id) {
                element.id = `toggle-${Math.random().toString(36).slice(2, 9)}`;
            }

            return element.id;
        }).join(' ');

        target.setAttribute('aria-controls', controls);
    }

    updateAriaExpanded(target, elements) {
        if (!this.isBinaryToggle(target)) {
            return;
        }

        const isExpanded = elements.some(element => !element.hidden);
        target.setAttribute('aria-expanded', isExpanded);
    }

    isBinaryToggle(target) {
        const controlledElements = this.findToggledElements(target);

        return controlledElements.length === 1;
    }
}

export { ToggleController };
