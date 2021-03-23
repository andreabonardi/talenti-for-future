<?php
$to = $_POST['email'];
$subject = "Sottomissione Form";
$first_name = $_POST['first_name'];

$message = "
<!doctype html>
<html>

<head>
    <meta charset='UTF-8'>
    <style>
        .imgmarchi {
            width: 100%;
            vertical-align: middle;
            float: left;
            max-width: 280px
        }
        
        @media (max-width:767px) {
            .hidemob {
                clear: both
            }
        }
        
        .redirect {
            font-family: 'San Francisco', 'Segoe UI', Arial, sans-serif;
        }
        
        p {
            background-color: #223843;
            color: white !important;
            font-family: 'San Francisco', 'Segoe UI', Arial, sans-serif;
        }
        
        a {
            color: #1B9AAA;
            text-decoration: none !important;
        }
        
        @media (max-width:614px) {
            body .imgmarchi {
                float: none !important;
                max-width: 320px !important;
                margin-left: auto!important;
                margin-right: auto!important;
            }
        }
    </style>
</head>

<body>
    <table style='background-color: white; -family: ' San Francisco ','Segoe UI ',Arial,sans-serif; font-weight: lighter; font-size: 20px; color: #9b9b9b; padding: 0 20px; margin: 0;' width='100%' cellspacing='0' cellpadding='0' align='center'>
        <tbody>
            <tr>
                <td style='padding: 0px;' align='center' width='100%'>
                    <table style='max-width: 600px; min-width: 480px;' width='100%' cellspacing='0' cellpadding='0' align='center'>
                        <tbody>
                            <tr>
                                <td align='center' width='100%'>
                                    <table width='100%' cellspacing='0' cellpadding='0' style='background-color: #223843;'>
                                        <tbody>
                                            <tr valign='middle'>
                                                <td style='padding: 20px 10px 0px; color: #32c24d;'>
                                                    <p style=' font-size: 16px; margin: 0; line-height: 2.8; color: #232323;'>
                                                        <a href='https://bonardiandrea.altervista.org/' target='_blank' title=''Andrea Bonardi>
                                                            <center><img class='CToWUd' style='vertical-align: middle;' src='https://bonardiandrea.altervista.org/images/logo.png' alt='Andrea Bonardi' width='120' align='center' /></center>
                                                        </a>
                                                    </p>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td align='center' width='100%'>
                                    <table style='background: #223843;; border-radius: 4px;' width='100%' cellspacing='0' cellpadding='0'>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <table style='padding: 0 0 1.5%;' width='100%' cellspacing='0' cellpadding='0'>
                                                        <tbody>
                                                            <tr>
                                                                <td style='padding: 5% 0px 1%;' align='center'>

                                                                   
                                                                    <p style='font-size: 17px; margin: 0px 35px 0px; margin-bottom: 10px; line-height: 1.5; color: #4a4a4a;' align='left'><span style='font-size: 20px;'>Gentile " . $first_name . ",</span> <br />ti ringrazio per avermi contattato! <br> Ecco una copia del tuo messaggio inviato ad <a href='mailto:info.bonardiandrea@gmail.com'
                                                                            title='Inviami una mail'>info.bonardiandrea@gmail.com</a> :
                                                                        <br /><br />" . $_POST['message'] . 

                                                                        "<br /><br /> Per ulteriori informazioni visita il sito: <a href='https://bonardiandrea.altervista.org/' target='_blank' title='Visita il mio sito'>www.bonardiandrea.altervista.org</a><br
                                                                        /><br /> Verrai rincontattato il prima possibile!<br /> <span style='font-size: 15px;'><em>Andrea Bonardi <br /></em></span>
                                                                    </p>
                                                                </td>
                                                            </tr>

                                                            <tr>
                                                                <td style='padding-top: 10px; padding: 0.5% 7.5% 0.5%; font-size: 20px; margin: 0; line-height: 1.4; color: #9b9b9b;' align='center'>
                                                                    <table>
                                                                        <tbody>
                                                                            <tr>
                                                                                <td class='redirect' style='text-align: center; font-size: 17px; background-color: #1B9AAA; outline: none;border: none;transform: skewX(-10deg);text-transform: uppercase;' align='center' width='90px'><a style='color: white; text-decoration: none; text-transform:uppercase; font-weight:400; letter-spacing:0.6px;' title='Visita il sito'
                                                                                        href='https://bonardiandrea.altervista.org/' target='_blank'>Visita il sito</a></td>
                                                                            </tr>




                                                                        </tbody>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>



                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
        </tbody>
    </table>
</body>

</html>
";


// Always set content-type when sending HTML email
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";

// More headers
$headers .= 'From: <info.bonardiandrea@gmail.com>' . "\r\n";

mail($to,$subject,$message,$headers);




$to2 = "info.bonardiandrea@gmail.com";

// Always set content-type when sending HTML email
$headers2 = "MIME-Version: 1.0" . "\r\n";
$headers2 .= "Content-type:text/html;charset=UTF-8" . "\r\n";

// More headers
$headers2 .= 'From: <' .$to . '>' . "\r\n";

$message2 = "Ciao Andrea, <br><br>" . $first_name . " ha completato la sottoscrizzione al form presente nell'Home Page del tuo sito. <br><br Ecco il messaggio inviato da " . $to . ": <br><br> " .$message ;

mail($to2,$subject,$message2,$headers2);
header('Location: thank-you.html');
?>
