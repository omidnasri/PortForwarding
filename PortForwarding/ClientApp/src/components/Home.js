import React, { Component } from 'react';
import { connect } from 'react-redux';

class Home extends Component {
    constructor(props) {
        super(props);

        this.state =
            {
                forecasts: [],
                loading: true,
                name: "",
                email: "",
                message: "",
                btnMessage: this.submitDefaultText,
                nameValid: false,
                emailValid: false,
                messageValid: false,
                formValid: false,
                formErrors: { name: "", email: "", message: "" },
                formMessage: ""
            };

        window.fetch('api/ip').then(response => response.json()).then(data => {
            this.setState({ forecasts: data.ipAddress, loading: false });
        });
    }

    submitDefaultText = "ثبت درخواست";

    submitDefaultLoadingText = "منتظر بمانیـــد";

    checkPort = (event) => {
        var myVar = setInterval(function () {
            if (document.getElementsByClassName("domain_search_button")[0].firstChild.className === "fa fa-search") {
                document.getElementsByClassName("domain_search_button")[0].firstChild.className = "fa fa-search-plus";
            }
            else {
                document.getElementsByClassName("domain_search_button")[0].firstChild.className = "fa fa-search";
            }
        }, 300);

        let ip = document.getElementsByClassName("domain_search_input")[0].value, port = document.getElementsByClassName("domain_search_selected")[0].firstChild.value;

        setTimeout(function () {
            window.fetch('api/port?ip=' + ip + '&port=' + port + '', { method: "POST" }).then(response => response.json()).then(data => {
                let dropDownSelector = document.getElementsByClassName("domain_search_dropdown")[0];
                if (data.isOpened) {
                    dropDownSelector.style.background = "green";
                    dropDownSelector.title = "پورت باز است";
                } else {
                    dropDownSelector.style.background = "#b33434";
                    dropDownSelector.title = "پورت بسته است";
                }

                document.getElementsByClassName("domain_search_button")[0].firstChild.className = "fa fa-search";

                window.clearInterval(myVar);
            });
        }, 1000);
    }

    changeState = (event) => {
        document.getElementsByClassName("domain_search_dropdown")[0].title = "";
        document.getElementsByClassName("domain_search_dropdown")[0].style.background = "#7836c6";
    }

    handelUserInpot = (event) => {
        const name = event.target.name;

        const value = event.target.value;

        this.setState({ [name]: value, formMessage: "" }, () => { this.validateInput(name, value); });
    }

    validateInput(fieldName, value) {
        let nameValid = this.state.nameValid;
        let emailValid = this.state.emailValid;
        let messageValid = this.state.messageValid;
        let fieldValidationErrors = this.state.formErrors;

        switch (fieldName) {
            case "name":
                nameValid = value.length >= 3;
                fieldValidationErrors.name = nameValid ? "" : "نام نامعتبر است.";
                break;
            case "message":
                messageValid = value.length >= 3;
                fieldValidationErrors.message = messageValid ? "" : "متن نامعتبر است.";
                break;
            case "email":
                emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                fieldValidationErrors.email = emailValid ? "" : "ایمیل نامعتبر است.";
                break;
        }

        this.setState({ nameValid: nameValid, emailValid: emailValid, messageValid: messageValid }, this.validateForm);
    }

    validateForm() {
        this.setState({ formValid: this.state.nameValid && this.state.emailValid && this.state.messageValid });
    }

    errorClass(hasError) {
        return hasError.length === 0 ? "" : "has_error";
    }

    submitForm = (event) => {
        if (this.state.formValid) {
            window.fetch("/api/ticket", { method: "POST", headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: this.state.name, email: this.state.email, message: this.state.message }) }).then(response => response).then(data => {
                if (data.status === 200) {
                    this.setState({ name: "", nameValid: false, email: "", emailValid: false, message: "", messageValid: false, formValid: false, formMessage: "درخواست با موفقیت ارسال گردید." });
                }
                else {
                    ;  // TODO: Hi Man...
                }
            });
        }
    }

    render() {
        let ip = this.state.loading ? "" : this.state.forecasts;
        return (
            <div className="super_container">
                <header className="header trans_400">
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <div className="header_content d-flex flex-row align-items-center justify-content-start trans_400">
                                    <div className="logo">
                                        <a href="/">Port<span>Forwarding</span></a>
                                    </div>
                                    <nav className="main_nav ml-auto mr-auto">
                                        <ul className="d-flex flex-row align-items-center justify-content-start">
                                            <li><a href="#contact">تماس با ما</a></li>
                                            <li><a href="#contact">درباره</a></li>
                                            <li><a href="#contact">خبـــــــر</a></li>
                                            <li><a href="#services">سرویس‌ها</a></li>
                                            <li className="active">
                                                <a href="#home">خانه</a>
                                            </li>
                                        </ul>
                                    </nav>
                                    <div className="log_reg">
                                        <div className="log_reg_content d-flex flex-row align-items-center justify-content-start">
                                            <div className="login log_reg_text"><a href="http://www.mycontrolpanel.ir/admin">ورود</a></div>
                                            <div className="register log_reg_text"><a href="http://www.mycontrolpanel.ir/admin">ثبت نام</a></div>
                                        </div>
                                    </div>
                                    <div className="hamburger ml-auto"><i className="fa fa-bars" aria-hidden="true"></i></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
                <div className="menu_overlay trans_400"></div>
                <div className="menu trans_400">
                    <div className="menu_close_container"><div className="menu_close"><div></div><div></div></div></div>
                    <div className="log_reg">
                        <div className="log_reg_content d-flex flex-row align-items-center justify-content-end">
                            <div className="login log_reg_text"><a href="javascript:;">Login</a></div>
                            <div className="register log_reg_text"><a href="javascript:;">Register</a></div>
                        </div>
                    </div>
                    <nav className="menu_nav">
                        <ul>
                            <li><a href="#home">خانه</a></li>
                            <li><a href="about.html">About us</a></li>
                            <li><a href="services.html">Services</a></li>
                            <li><a href="blog.html">News</a></li>
                            <li><a href="contact.html">Contact</a></li>
                        </ul>
                    </nav>
                </div>
                <div className="home" id="home">
                    <div className="home_background"></div>
                    <div className="background_image background_city"></div>
                    <div className="cloud cloud_1">
                        <img src="images/cloud.png" />
                    </div>
                    <div className="cloud cloud_2">
                        <img src="images/cloud.png" alt="" />
                    </div>
                    <div className="cloud cloud_3">
                        <img src="images/cloud_full.png" />
                    </div>
                    <div className="cloud cloud_4">
                        <img src="images/cloud.png" />
                    </div>
                    <div className="home_container">
                        <div className="container">
                            <div className="row">
                                <div className="col">
                                    <div className="home_content text-center">
                                        <div className="home_title">سیستم مانیتورینگ سرور</div>
                                        <div className="home_text">
                                            پورت فورواردینگ با کنترل مداوم سرویس‌های شما از سرورهای داخل و خارج ایران و به کمک چرخه‌های کاری، اختلال‌ها یا افت سرعت پاسخگوئی را قبل از کاربرانتان به شما اطلاع می دهد.
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-10 offset-lg-1">
                                    <div className="domain_search_form_container">
                                        <form action="#" id="domain_search_form" className="domain_search_form d-flex flex-md-row flex-column align-items-center justify-content-start">
                                            <div className="d-flex flex-row align-items-center justify-content-start">
                                                <input type="text" className="domain_search_input" placeholder={ip} onChange={this.changeState} />
                                                <div className="domain_search_dropdown d-flex flex-row align-items-center justify-content-start">
                                                    <i className="fa fa-chevron-down" aria-hidden="true"></i>
                                                    <div className="domain_search_selected">
                                                        <input type="text" onChange={this.changeState} />
                                                    </div>
                                                    <ul>
                                                        <li>80</li>
                                                        <li>21</li>
                                                        <li>3389</li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <button type="button" className="domain_search_button d-flex flex-row align-items-center justify-content-center" onClick={this.checkPort}>
                                                <i className="fa fa-search"></i>جستـــجو
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="intro" id="services">
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <div className="section_title text-center magic_fade_in">
                                    <div className="section_title text-center"><h2>سیستم مانیتورینگ سرور چگونه کار می‌کند</h2></div>
                                </div>
                            </div>
                        </div>
                        <div className="row intro_row">
                            <div className="intro_dots magic_fade_in"></div>
                            <div className="col-lg-4 intro_col magic_fade_in">
                                <div className="intro_item d-flex flex-column align-items-center justify-content-start text-center">
                                    <div className="intro_icon_container d-flex flex-column align-items-center justify-content-center">
                                        <div className="intro_icon"><img src="images/icon_1.svg" alt="https://www.flaticon.com/authors/freepik" /></div>
                                    </div>
                                    <div className="intro_item_content">
                                        <div className="intro_item_title">پیکربندی مانیتورینگ</div>
                                        <div className="intro_item_text">
                                            <p>
                                                گام نهایی تعریف و پیکربندی مانیتورینگ و اجرا چرخه است و اطلاع رسانی از طریق گام دوم انجام می‌شود.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 intro_col magic_fade_in">
                                <div className="intro_item d-flex flex-column align-items-center justify-content-start text-center">
                                    <div className="intro_icon_container d-flex flex-column align-items-center justify-content-center">
                                        <div className="intro_icon"><img src="images/icon_2.svg" alt="https://www.flaticon.com/authors/freepik" /></div>
                                    </div>
                                    <div className="intro_item_content">
                                        <div className="intro_item_title">ایجاد اطلاع رسانی</div>
                                        <div className="intro_item_text">
                                            <p>
                                                ایجاد اطلاع رسانی از جمله تنظیماتی می‌باشد که الزامی است توسط کاربر وارد شده تا مانیتورینگ قابل اجرا باشد.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 intro_col magic_fade_in">
                                <div className="intro_item d-flex flex-column align-items-center justify-content-start text-center">
                                    <div className="intro_icon_container d-flex flex-column align-items-center justify-content-center">
                                        <div className="intro_icon"><img src="images/icon_3.svg" alt="https://www.flaticon.com/authors/freepik" /></div>
                                    </div>
                                    <div className="intro_item_content">
                                        <div className="intro_item_title">تعریف ســــــرور</div>
                                        <div className="intro_item_text">
                                            <p>
                                                نخستین گام، تعریف سرورهای است که قصد دارید جهت مانیتورینگ و فعال سازی چرخه استفاده نمایید.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col text-center">
                                <div className="intro_button text-center trans_200 ml-auto mr-auto">
                                    <a href="http://www.mycontrolpanel.ir/admin">
                                        ثبت نام رایگان
                            </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="tabs_section">
                    <div className="parallax_background parallax-window" data-parallax="scroll" data-image-src="images/tabs.jpg" data-speed="0.8"></div>
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <div className="tabs d-flex flex-row align-items-center justify-content-start flex-wrap magic_fade_in">
                                    <div className="tab">پشتیبانی از چندین پروتکل</div>
                                    <div className="tab">انتقال اطلاعات</div>
                                    <div className="tab">جلوگیری از بروز هشدارهای اشتباه</div>
                                    <div className="tab">شبکه‌های اجتماعی</div>
                                    <div className="tab active">تعیین ساعت تعمیرات سرور</div>
                                </div>
                                <div className="tab_panels magic_fade_in">
                                    <div className="tab_panel">
                                        <div className="tab_panel_content d-flex flex-row align-items-start justify-content-start">
                                            <div className="row">
                                                <div className="col-lg-5">
                                                    <div className="tab_image_container">
                                                        <div className="tab_image"><img src="images/tabs_image.jpg" alt="" /></div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-7">
                                                    <div className="tab_content">
                                                        <div className="tab_text">
                                                            <p>
                                                                ما از تمامی پروتکل‌های موجود و مورد استفاده‌ی شما برای سرویس‌های مختلف پشتیبانی می‌کنیم MySQL, HTTP, HTTPS, PING, FTP, Mail و …
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab_panel">
                                        <div className="tab_panel_content d-flex flex-row align-items-start justify-content-start">
                                            <div className="row">
                                                <div className="col-lg-5">
                                                    <div className="tab_image_container">
                                                        <div className="tab_image"><img src="images/tabs_image.jpg" alt="" /></div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-7">
                                                    <div className="tab_content">
                                                        <div className="tab_text">
                                                            <p>
                                                                اگر شما هم‌اکنون از سیستم مانیتورینگ دیگری استفاده می‌کنید ما می‌توانیم تمام آمارهای گذشته‌ی شما را از سرویس قبلی به سرویس جدید بدون هیچ هزینه‌ای و به آسانی منتقل کنیم.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab_panel">
                                        <div className="tab_panel_content d-flex flex-row align-items-start justify-content-start">
                                            <div className="row">
                                                <div className="col-lg-5">
                                                    <div className="tab_image_container">
                                                        <div className="tab_image"><img src="images/tabs_image.jpg" alt="" /></div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-7">
                                                    <div className="tab_content">
                                                        <div className="tab_text">
                                                            <p>
                                                                دیگر لازم نیست نیمه شب به خاطر یک هشدار اشتباه از خواب بیدار شوید، ما از بهترین تکنولوژی روز دنیا استفاده می‌نماییم تا از ارسال هشدارهای اشتباه جلوگیری کنیم.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab_panel">
                                        <div className="tab_panel_content d-flex flex-row align-items-start justify-content-start">
                                            <div className="row">
                                                <div className="col-lg-5">
                                                    <div className="tab_image_container">
                                                        <div className="tab_image"><img src="images/tabs_image.jpg" alt="" /></div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-7">
                                                    <div className="tab_content">
                                                        <div className="tab_text">
                                                            <p>
                                                                جدیدترین بروز رسانی پورت فورواردینگ پشتیبانی از پیام رسان اسلک است. جهت دسترسی به امکانات سایر شبکه‌های اجتماعی به بخش مدیریتی وارد شوید.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab_panel active">
                                        <div className="tab_panel_content d-flex flex-row align-items-start justify-content-start">
                                            <div className="row">
                                                <div className="col-lg-5">
                                                    <div className="tab_image_container">
                                                        <div className="tab_image"><img src="images/tabs_image.jpg" alt="" /></div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-7">
                                                    <div className="tab_content">
                                                        <div className="tab_text">
                                                            <p>
                                                                امکان تعیین ساعت تعمیرات سرور؛ شما می‌توانید زمانی را برای تعمیر سرور خود در نظر بگیرید تا در این زمان سرویس مانیتورینگ به طور موقت قطع شده و زمان قعطی درگزارش‌های Uptime شما منعکس نشود.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="services">
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <div className="section_title text-center magic_fade_in">
                                    <h2>
                                        امکانات سرویس مانیتورینگ
                                    </h2>
                                </div>
                            </div>
                        </div>
                        <div className="row services_row">
                            <div className="col-lg-4 col-md-6 service_col magic_fade_in">
                                <div className="service d-flex flex-column align-items-center justify-content-start text-center trans_200">
                                    <div className="service_icon"><img className="svg" src="images/icon_4.svg" /></div>
                                    <div className="service_title"><h3>بررسی پورت های TCP</h3></div>
                                    <div className="service_text">
                                        <p>
                                            با استفاده از این ابزار می توانید از وضعیت باز یا بسته بودن پورت دلخواه خود مطلع شوید ودر صورت عدم برقراری اتصال هشدار تنظیم نمایید.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 service_col magic_fade_in">
                                <div className="service d-flex flex-column align-items-center justify-content-start text-center trans_200">
                                    <div className="service_icon"><img className="svg" src="images/icon_6.svg" /></div>
                                    <div className="service_title"><h3>پایشگر PING</h3></div>
                                    <div className="service_text">
                                        <p>
                                            با استفاده از ابزار پینگ پورت فورواردینگ می‌توانید از وبسایت خود پینگ بگیرید و در دسترس بودن وبسایت خود را در شبکه بررسی کنید.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 service_col magic_fade_in">
                                <div className="service d-flex flex-column align-items-center justify-content-start text-center trans_200">
                                    <div className="service_icon"><img className="svg" src="images/icon_5.svg" /></div>
                                    <div className="service_title"><h3>بررسی محتوای سایت</h3></div>
                                    <div className="service_text">
                                        <p>
                                            به کمک پایشگر بررسی محتوای سایت پورت فورواردینگ، از وجود و یا عدم وجود کلید واژه‌های خطرناک در وبسایت‌های خود مطمئن شوید.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="cta" id="contact">
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <div className="cta_content d-flex flex-lg-row flex-column align-items-center justify-content-lg-between justify-content-center magic_fade_in rtl">
                                    <div className="cta_title">
                                        وب سایت و سرویس آنلاین خود را با سرویس پورت فورواردینگ مانیتور کنید
                                    </div>
                                    <div className="cta_button">
                                        <a href="http://www.mycontrolpanel.ir/admin" target="_blank">
                                            ثبت نام رایگان
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <footer className="footer magic_fade_in rtl">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6 footer_col">
                                <div className="footer_links">
                                    <div className="row">
                                        <div className="row">
                                            <div className="col-sm-6 footer_list_col magic_fade_in">
                                                <div className="footer_list_container">
                                                    <div className="footer_list_title">ویکی‌پیدیا</div>
                                                    <ul className="footer_list">
                                                        <li><a href="javascript:;">آی‌پی آدرس</a></li>
                                                        <li><a href="javascript:;">پورت</a></li>
                                                        <li><a href="javascript:;">پروتکل</a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="col-sm-6 footer_list_col magic_fade_in">
                                                <div className="footer_list_container">
                                                    <div className="footer_list_title">دانستنی‌ها</div>
                                                    <ul className="footer_list">
                                                        <li><a href="javascript:;">پورت 80</a></li>
                                                        <li><a href="javascript:;">فایروال</a></li>
                                                        <li><a href="javascript:;">انواع پورت‌ها</a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="col-sm-6 footer_list_col magic_fade_in">
                                                <div className="footer_list_container">
                                                    <div className="footer_list_title">دوستان</div>
                                                    <ul className="footer_list">
                                                        <li><a href="javascript:;">مهدی خادمی</a></li>
                                                        <li><a href="javascript:;">علی‌رضا حیدریان</a></li>
                                                        <li><a href="javascript:;">جلال خردادی</a></li>
                                                        <li><a href="javascript:;">سعید کشاورز</a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="col-sm-6 footer_list_col magic_fade_in">
                                                <div className="footer_list_container">
                                                    <div className="footer_list_title">سرویس آنلایــــــــن</div>
                                                    <ul className="footer_list">
                                                        <li><a href="http://www.crm-support.ir/" target="_blank">پشتیبانی سی‌آرام</a></li>
                                                        <li><a href="http://www.omidnasri.ir/" target="_blank">برنامه‌نویسی</a></li>
                                                        <li><a href="http://www.mycontrolpanel.ir/admin" target="_blank">میز کــــار آنلاین</a></li>
                                                        <li><a href="https://www.dotnettips.info/" target="_blank">دات نت تیپس</a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 footer_col magic_fade_in">
                                <div className="footer_about">
                                    <div className="footer_logo">Port<span>Forwarding</span></div>
                                    <div className="copyright"></div>
                                    <div className="footer_text">
                                        <p>
                                            خوشحال می‌شویم نقطه نظرات خود را با ما به اشتراک بگذارید. اگر قابلیت در این سایت فعال نمی‌بینید و لازم است آن را اضافه کنیم، به ما اطلاع دهید، ما کنار شما خواهیم بود.
                                        </p>
                                    </div>
                                    <div className="contact_container">
                                        <form action="javascript:;" id="contact_form" className="contact_form">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <input type="text" name="name" className={`contact_input ${this.errorClass(this.state.formErrors.name)}`} placeholder="نام و نام خانوادگی" value={this.state.name} onChange={this.handelUserInpot} title={this.state.formErrors.name} />
                                                </div>
                                                <div className="col-md-6">
                                                    <input type="email" name="email" className={`contact_input ${this.errorClass(this.state.formErrors.email)}`} placeholder="پست الکترونیکی" value={this.state.email} onChange={this.handelUserInpot} title={this.state.formErrors.email} />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <textarea name="message" className={`contact_input contact_textarea ${this.errorClass(this.state.formErrors.message)}`} placeholder="متن پیام ..." value={this.state.message} onChange={this.handelUserInpot} title={this.state.formErrors.message} />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-9">
                                                    <p>
                                                        {this.state.formMessage}
                                                    </p>
                                                </div>
                                                <div className="col-md-3">
                                                    <button type="button" onClick={this.submitForm} className={`contact_button ${this.state.formValid ? "allow_submit" : "deny_submit"}`}>
                                                        {this.state.btnMessage}
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        );
    }
}

export default connect()(Home);
