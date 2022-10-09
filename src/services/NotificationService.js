export default class NotificationService {
  static showApiResponseErrorAlert(toast, response) {
    if (response.data) {
      toast({
        description: response.data.error.message,
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'top',
      });
    } else {
      toast({
        description: `Ocorreu algum erro inesperado! Por favor, tente novamente mais tarde.`,
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'top',
      });
    }
  }

  static showErrorAlert(toast, description) {
    toast({
      description: description,
      status: 'error',
      duration: 9000,
      isClosable: true,
      position: 'top',
    });
  }

  static showSuccessAlert(toast, description) {
    toast({
      description: description,
      status: 'success',
      duration: 9000,
      isClosable: true,
      position: 'top',
    });
  }
}
