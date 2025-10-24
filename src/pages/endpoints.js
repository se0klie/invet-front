import urlJoin from "url-join";

const API_ROOT = "";

export const endpoints = {
    create_user: urlJoin(API_ROOT, "create-account/"),
    session_token: urlJoin(API_ROOT, "create-session-token/"),
    create_sub: urlJoin(API_ROOT, "create-subscription/"),
    remove_card: urlJoin(API_ROOT, "delete-card/"),
    registered_cards: urlJoin(API_ROOT, "registered-cards/"),
    update_data: urlJoin(API_ROOT, 'modify-account/'),
    add_pet: urlJoin(API_ROOT, 'create-mascota/'),
    exchange_plans: urlJoin(API_ROOT, 'swap-subscriptions/'),
    get_subs: urlJoin(API_ROOT, 'get-subscriptions/'),
    change_method: urlJoin(API_ROOT, 'change-card-for-subscription/'),
    cancel_sub: urlJoin(API_ROOT, 'cancel-subscription/'),
    get_pets: urlJoin(API_ROOT, 'get-mascotas/'),
    account_data: urlJoin(API_ROOT, 'account-data/'),
    edit_pet: urlJoin(API_ROOT, 'modify-mascota/'),
    fetch_card_data: urlJoin(API_ROOT, 'registered-cards/'),
    check_password: urlJoin(API_ROOT, 'verify-password/'),
    send_email: urlJoin(API_ROOT, 'send-verification-email/'),
    send_password_reset: urlJoin(API_ROOT, 'send-password-reset-email/'),
    get_bills: urlJoin(API_ROOT, 'get-facturas/'),
    delete_acc: urlJoin(API_ROOT, 'delete-account/'),
    modify_pet: urlJoin(API_ROOT, 'modify-mascota/'),
    contact_email: urlJoin(API_ROOT, 'contact-email/'),
    delete_pet: urlJoin(API_ROOT, 'delete-mascota/')
};
