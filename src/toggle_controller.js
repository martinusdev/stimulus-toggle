import { Controller } from '@hotwired/stimulus';

export default class ToggleController extends Controller {
    static targets = ["element", "select", "checkbox", "radio"]

    connect() {
        this.initTargets();
    }

    initTargets() {
        for (let target of [...this.selectTargets, ...this.checkboxTargets, ...this.radioTargets]) {
            this.applyToggle(target);
        }
    }

    changed(event) {
        this.applyToggle(event.target)
    }

    applyToggle(target) {
        const toggleSet = target.dataset.toggleSet;
        let value = this.getTargetValue(target);

        if (!toggleSet) {
            this.applyToggleToElements(this.elementTargets, value);
        } else {
            const toggledElements = this.findToggledElements(toggleSet);

            this.applyToggleToElements(toggledElements, value);
        }
    }

    applyToggleToElements(elements, value) {
        for (let element of elements) {
            this.toggle(element, element.dataset.values, value);
        }
    }

    findToggledElements(toggleSet) {
        return this.elementTargets.filter(element => {
            return element.dataset.toggleSet.split(',').includes(toggleSet.trim());
        });
    }

    toggle(element, values, value) {
        if (element && values) {
            element.hidden = !values.split(',').includes(value);
        }
    }

    getTargetValue(target) {
        if (target.dataset.toggleTarget === 'checkbox') {
            return target.checked ? target.value : null;
        }

        if (target.dataset.toggleTarget === "radio") {
            return target.querySelector('input:checked').value;
        }

        return target.value;
    }
}

export { ToggleController };
