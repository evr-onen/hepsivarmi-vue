<template>
    <div class="footer">
        <div class="footer-content">
             <div class="left-area">
                <div class="logo">
                    <p>VueCommerce</p>
                </div>
                <div class="description">
                    <p>Condimentum adipiscing vel neque dis nam parturient orci at scelerisque neque dis nam parturient.</p>
                </div>
                <div class="contact-info">
                    <div class="address">
                        <Icon name="mdi:map-marker" class="icon" />
                        <p>1234 Main St, Anytown, USA</p>
                    </div>
                    <div class="phone">
                        <Icon name="mdi:phone" class="icon" />
                        <p>123-456-7890</p>
                    </div>
                    <div class="email">
                        <Icon name="mdi:email" class="icon" />
                        <p>info@example.com</p>
                    </div>
                </div>
             </div>            
             <div class="right-area">
                <div class="stores footer-link-block">
                    <h4>our stores</h4>
                    <ul>
                        <li><a href="#" class="link">New York</a></li>
                        <li><a href="#" class="link">London SF</a></li>
                        <li><a href="#" class="link">Edinburgh</a></li>
                        <li><a href="#" class="link">Los Angeles</a></li>
                        <li><a href="#" class="link">Chicago</a></li>
                        <li><a href="#" class="link">Las Vegas</a></li>
                    </ul>
                </div>
                <div class="links footer-link-block">
                    <h4>useful links</h4>
                    <ul>
                        <li><a href="#" class="link">Privacy Policy</a></li>
                        <li><a href="#" class="link">Returns</a></li>
                        <li><a href="#" class="link">Terms & Conditions</a></li>
                        <li><a href="#" class="link">Contact Us</a></li>
                        <li><a href="#" class="link">Latest News</a></li>
                        <li><a href="#" class="link">Our Sitemap</a></li>
                    </ul>
                </div>
                <div class="pages footer-link-block">
                    <h4>Pages</h4>
                    <ul>
                        <li><a href="#" class="link">Instagram profile</a></li>
                        <li><a href="#" class="link">New Collection</a></li>
                        <li><a href="#" class="link">Woman Dress</a></li>
                        <li><a href="#" class="link">Contact Us</a></li>
                        <li><a href="#" class="link">Latest News</a></li>
                    </ul>
                </div>
             </div>            
        </div>
        <div class="footer-bottom-content">
            <div class="content">
                <p>© 2025 VueCommerce. Cloned by <a href="https://woodmart.xtemos.com/" target="_blank" class="link font-bold">Woodmart</a>.</p>
                <div class="payment-methods">
                    <NuxtImg class="payment-method-icons" src="/images/payment.png" alt="payment-methods" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
.footer {
    width: 100%;
    display: flex;
    flex-direction: column;
    font-family: 'Lato', sans-serif;

    .footer-content {
        display: flex;
        justify-content: space-between;
        width: 100%;
        max-width: 1240px;
        padding: 0 1.25rem;
        margin-inline: auto;
        font-size: .75rem;
        font-weight: 400;


        .left-area {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            width: 30%;
            padding: 4.25rem 0;

            .logo {
                font-family: "Tangerine", cursive;
                font-weight: 700;
                height: auto;
                font-size: 3.5rem;
                color: #000;
                display: flex;
                align-items: center;
                margin-right: auto;

                >p {
                    height: 3.5rem;
                }
            }

            .description {

                font-size: .875rem;
                font-weight: 400;
                color: #767676;
            }

            .contact-info {
                margin-top: 1.5rem;
                display: flex;
                flex-direction: column;
                color: #767676;
                gap: 0.5rem;

                >* {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;

                    .icon {
                        color: #767676;
                        height: 1.25rem;
                        width: 1.25rem;
                    }

                    >p {
                        font-size: .875rem;
                        font-weight: 400;
                    }
                }
            }
        }

        .right-area {
            width: 50%;
            display: flex;
            gap: 5rem;
            padding: 4.25rem 0;

            .footer-link-block {
                display: flex;
                flex-direction: column;
                gap: 0.5rem;

                h4 {
                    font-size: 1rem;
                    font-weight: 600;
                    color: #333;
                    text-transform: uppercase;
                    margin-bottom: 1.25rem;
                }

                ul {
                    display: flex;
                    flex-direction: column;
                    gap: 0.75rem;

                    li {
                        font-size: .875rem;
                        font-weight: 400;
                        color: #767676;

                        &:hover {
                            color: #333;
                        }
                    }

                }


            }
        }
    }

    .footer-bottom-content {
        border-top: 1px solid #0000001b;
        display: flex;
        align-items: center;
        padding: .25rem 0;

        .content {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            max-width: 1240px;
            padding: 0 1.25rem;
            margin-inline: auto;
            height: 2.625rem;
            color: #767676;
            font-size: .75rem;

            .payment-methods {
                display: flex;
                gap: 0.5rem;

                .payment-method-icons {
                    height: 1rem;
                }
            }
        }
    }

}
</style>