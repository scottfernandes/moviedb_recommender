import random,smtplib


def send_otp(email):
    otp = ''.join([str(random.randint(0,9)) for i in range(6)])
    server = smtplib.SMTP('smtp.gmail.com',587)
    server.starttls()
    server.login('scottfernandes3586@gmail.com',password='aomw auni ysqg mgjt')

    msg = 'Your 6-digit verification code is '+str(otp)
    server.sendmail(f'scottfernandes3586@gmail.com',{email},msg)
    server.quit()
    print(msg,otp)
    return msg,otp

