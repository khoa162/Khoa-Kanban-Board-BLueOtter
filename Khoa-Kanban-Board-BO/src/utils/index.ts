export const getMonthDate = (): string => {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    const date_ob = new Date(Date.now());
    return monthNames[date_ob.getMonth() + 1] + " " + date_ob.getDate();
};