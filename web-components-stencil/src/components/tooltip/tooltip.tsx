import { Component, h, Prop, State } from '@stencil/core'

@Component({
    tag: 'uc-tooltip',
    styleUrl: 'tooltip.css',
    shadow: true
})
export class Tooltip {
    @Prop({ reflect: true }) message: string;
    @State() isTooltipShown = false;

    onTooltipClick() {
        this.isTooltipShown = !this.isTooltipShown
    }

    render() {        
        return (
            <span class="tooltip">
                <slot></slot>
                <button class="tooltip-btn" onClick={this.onTooltipClick.bind(this)}>
                    ?
                </button>
                {this.isTooltipShown && (
                    <div class="tooltip-message-container">
                        {this.message}
                    </div>
                )}                
            </span>
        )
    }
}