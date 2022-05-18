import React, { Component } from 'react'
import classNames from 'classnames'
import { Context } from '../../Context'
import { GLOBALS } from '../../utils/Globals'
import { AppMenu } from '../AppMenu'
import { AppFooter } from '../AppFooter'
import { AppProfile } from '../AppProfile'
import { AppTopbar } from '../AppTopbar'
export class Layout extends Component {
    static contextType = Context

    constructor() {
        super()
        this.state = {
            layoutMode: 'static',
            layoutColorMode: 'dark',
            staticMenuInactive: false,
            overlayMenuActive: false,
            mobileMenuActive: false,
            userLogged: null,
            isUserLoggedAgent: false,
        }

        this.onWrapperClick = this.onWrapperClick.bind(this)
        this.onToggleMenu = this.onToggleMenu.bind(this)
        this.onSidebarClick = this.onSidebarClick.bind(this)
        this.onMenuItemClick = this.onMenuItemClick.bind(this)
        this.createMenu()
    }

    onWrapperClick(event) {
        if (!this.menuClick) {
            this.setState({
                overlayMenuActive: false,
                mobileMenuActive: false,
            })
        }

        this.menuClick = false
    }

    onToggleMenu(event) {
        this.menuClick = true

        if (this.isDesktop()) {
            if (this.state.layoutMode === 'overlay') {
                this.setState({
                    overlayMenuActive: !this.state.overlayMenuActive,
                })
            } else if (this.state.layoutMode === 'static') {
                this.setState({
                    staticMenuInactive: !this.state.staticMenuInactive,
                })
            }
        } else {
            const mobileMenuActive = this.state.mobileMenuActive
            this.setState({
                mobileMenuActive: !mobileMenuActive,
            })
        }

        event.preventDefault()
    }

    onSidebarClick(event) {
        this.menuClick = true
    }

    onMenuItemClick(event) {
        if (!event.item.items) {
            this.setState({
                overlayMenuActive: false,
                mobileMenuActive: false,
            })
        }
    }

    createMenu() {
        this.menu = [{
                label: GLOBALS.menu.dashboard.title,
                icon: GLOBALS.menu.dashboard.icon,
                to: GLOBALS.menu.dashboard.link,
            }, 
            {
                label: GLOBALS.menu.users.title,
                icon: GLOBALS.menu.users.icon,
                to: GLOBALS.menu.users.link,
            },
        ]
    }

    addClass(element, className) {
        if (element.classList) element.classList.add(className)
        else element.className += ' ' + className
    }

    removeClass(element, className) {
        if (element.classList) element.classList.remove(className)
        else
            element.className = element.className.replace(
                new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'),
                ' '
            )
    }

    isDesktop() {
        return window.innerWidth > 1024
    }

    componentDidMount() {
        const isUser = this.context.userLogged.role === GLOBALS.roles.user.id

        const isMenuVisible = this.props.isMenuVisible !== undefined ? this.props.isMenuVisible : true

        this.setState({
            staticMenuInactive: !(isMenuVisible && !isUser),
        })

        this.setState({
            userLogged: this.context.userLogged,
            isUserLoggedAgent: isUser,
        })
    }

    componentDidUpdate() {
        if (this.state.mobileMenuActive) this.addClass(document.body, 'body-overflow-hidden')
        else this.removeClass(document.body, 'body-overflow-hidden')
    }

    render() {
        const logo =
            this.state.layoutColorMode === 'dark' ?
            '/assets/layout/images/logonol.png' :
            '/assets/layout/images/logoEmpresaA.png'

        const wrapperClass = classNames('layout-wrapper', {
            'layout-overlay': this.state.layoutMode === 'overlay',
            'layout-static': this.state.layoutMode === 'static',
            'layout-static-sidebar-inactive': this.state.staticMenuInactive && this.state.layoutMode === 'static',
            'layout-overlay-sidebar-active': this.state.overlayMenuActive && this.state.layoutMode === 'overlay',
            'layout-mobile-sidebar-active': this.state.mobileMenuActive,
        })

        const sidebarClassName = classNames('layout-sidebar', {
            'layout-sidebar-dark': this.state.layoutColorMode === 'dark',
            'layout-sidebar-light': this.state.layoutColorMode === 'light',
        })

        return ( < div className = { wrapperClass } onClick = { this.onWrapperClick } >
    {<AppTopbar showToggler = {!this.state.isUserLoggedAgent }onToggleMenu = { this.onToggleMenu }/>}

            {
                !this.state.isUserLoggedAgent ? ( < div ref = {
                        (el) => (this.sidebar = el)
                    }
                    className = { sidebarClassName }
                    onClick = { this.onSidebarClick } >
                    <div className = "layout-logo" >
                    <img alt = "Logo" src = { logo } width = "250" / >
                    </div>
                    {<AppProfile/>}
                    < AppMenu model = { this.menu } showToggler = {!this.state.isUserLoggedAgent } onToggleMenu = { this.onToggleMenu } onMenuItemClick = { this.onMenuItemClick }/> </div>
                ) : ( 
                <div/>
                )
            }
            <div className = "layout-main" > { this.props.children } </div>
            {< AppFooter/>}
            <div className = "layout-mask" > </div> </div>
        )
    }
}