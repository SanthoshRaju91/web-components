import { Component, h, Method, Prop, State } from '@stencil/core'

@Component({
    tag: 'uc-side-drawer',
    styleUrl: 'side-drawer.css',
    shadow: true
})
export class SideDrawer {
    @Prop({ reflect: true }) title: string;
    @Prop({ reflect: true }) opened: boolean;

    @State() isContactShown = false;

    @Method()
    open() {
        this.opened = true
    }

    onCloseDrawer() {
        this.opened = false;
    }

    onContentChange(content: string) {
        this.isContactShown = content === 'contact';
    }

    render() {
        let mainContent = <slot />

        if (this.isContactShown) {
            mainContent = (
                <div id="contact-information">
                    <h2>Contact Information</h2>
                    <p>You can reach us via phone or email</p>
                    <ul>
                        <li>Phone: 9738343297</li>
                        <li>E-Mail: <a href="email">something@something.com</a></li>
                    </ul>
                </div>
            )
        }
        
        return [
            <div class="backdrop" onClick={this.onCloseDrawer.bind(this)}></div>,
            <aside>
                <header>
                    <h1>{this.title}</h1>
                    <button onClick={this.onCloseDrawer.bind(this)}>X</button>
                </header>
                <section id="tabs">
                    <button
                        class={!this.isContactShown ? 'active': ''}
                        onClick={this.onContentChange.bind(this, 'nav')}
                    >
                        Navigation
                    </button>
                    <button
                        class={this.isContactShown ? 'active': ''}
                        onClick={this.onContentChange.bind(this, 'contact')}
                    >
                        Contact
                    </button>
                </section>
                <main>
                    {mainContent}
                </main>
            </aside>
        ]
    }
}