const getUniqueCode = () => {
    let code = "";

    for (i = 0; i < 6; i++) {
        let index = Math.floor(Math.random() * 62);

        /**
         * Mapping:
         * 0 - 9        0 - 9
         * 10 - 35      A - Z
         * 36 - 61      a - z
         */

        if (index < 10) {
            code = code + index;
        } else if (index < 36) {
            code = code + String.fromCharCode(index + 55);
        } else {
            code = code + String.fromCharCode(index + 61);
        }
    }

    return code;
};